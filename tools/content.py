"""Safe, intentionally small Markdown/Quarto-subset renderer for course material."""

import html
import re
import unicodedata
from pathlib import Path
from urllib.parse import urlparse


def escape(value):
    return html.escape(str(value), quote=True)


def strip_frontmatter(text):
    return re.sub(r"\A---\s*\n.*?\n---\s*\n", "", text, count=1, flags=re.S)


def _slug(text, used):
    plain = re.sub(r"[`*_]", "", text)
    plain = (
        unicodedata.normalize("NFKD", plain).encode("ascii", "ignore").decode().lower()
    )
    base = re.sub(r"[^a-z0-9]+", "-", plain).strip("-") or "seccion"
    count = used.get(base, 0) + 1
    used[base] = count
    return base if count == 1 else f"{base}-{count}"


def safe_destination(destination, unit_routes):
    """Return a published target or None; source-only QMD files never become links."""
    destination = destination.strip()
    parsed = urlparse(destination)
    if parsed.scheme in {"https", "http", "mailto"}:
        return destination
    if destination.startswith("#"):
        return destination
    match = re.search(r"(?:^|/)([0-9]{2}-[a-z-]+)/index\.qmd(?:#(.*))?$", destination)
    if match and match.group(1) in unit_routes:
        suffix = f"#{match.group(2)}" if match.group(2) else ""
        return f"{match.group(1)}.html{suffix}"
    return None


def _inline(text, routes):
    """Escape source text before adding only validated links and Markdown emphasis."""
    parts = re.split(r"(`[^`]*`)", text)
    rendered = []
    for part in parts:
        if part.startswith("`") and part.endswith("`"):
            rendered.append(f"<code>{escape(part[1:-1])}</code>")
            continue
        tokens = []

        def token(markup):
            tokens.append(markup)
            return f"\x00{len(tokens) - 1}\x00"

        def link(match):
            target = safe_destination(match.group(2), routes)
            label = _inline(match.group(1), routes)
            return token(f'<a href="{escape(target)}">{label}</a>') if target else label

        part = re.sub(r"\[([^]]+)\]\(([^)]+)\)", link, part)
        part = re.sub(
            r"<(https?://[^>\s]+)>",
            lambda match: token(
                f'<a href="{escape(match.group(1))}">{escape(match.group(1))}</a>'
            ),
            part,
        )
        part = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", escape(part))
        for index, markup in enumerate(tokens):
            part = part.replace(f"\x00{index}\x00", markup)
        rendered.append(part)
    return "".join(rendered)


def _table(lines, routes):
    rows = [
        [cell.strip() for cell in line.strip().strip("|").split("|")] for line in lines
    ]
    header, body = rows[0], rows[2:]
    cells = lambda tag, row: "".join(
        f"<{tag}>{_inline(cell, routes)}</{tag}>" for cell in row
    )
    return (
        "<table><thead><tr>"
        + cells("th", header)
        + "</tr></thead><tbody>"
        + "".join("<tr>" + cells("td", row) + "</tr>" for row in body)
        + "</tbody></table>"
    )


def render_markdown(text, unit_routes):
    """Render the supported course subset; every unrecognised line is escaped prose."""
    lines = strip_frontmatter(text).splitlines()
    result, paragraph, used = [], [], {}

    def flush():
        if paragraph:
            result.append(
                f"<p>{_inline(' '.join(part.strip() for part in paragraph), unit_routes)}</p>"
            )
            paragraph.clear()

    index = 0
    while index < len(lines):
        line = lines[index]
        if line.startswith("```{quizdown}"):
            flush()
            index += 1
            while index < len(lines) and not lines[index].startswith("```"):
                index += 1
        elif line.startswith("````quizdown"):
            flush()
            index += 1
            while index < len(lines) and not lines[index].startswith("````"):
                index += 1
        elif line.startswith("```"):
            flush()
            language = line[3:].strip().lstrip("{").rstrip("}") or "text"
            index += 1
            code = []
            while index < len(lines) and not lines[index].startswith("```"):
                code.append(lines[index])
                index += 1
            result.append(
                f'<pre><code class="language-{escape(language)}">{escape(chr(10).join(code))}</code></pre>'
            )
        elif line.startswith("::: quizdown"):
            flush()
            index += 1
            while index < len(lines) and lines[index].strip() != ":::":
                index += 1
        elif line.startswith(":::"):
            flush()
            kind = re.search(r"callout-([a-z]+)", line)
            css = f"callout callout-{kind.group(1)}" if kind else "callout"
            result.append(f'<section class="{css}">')
            index += 1
            inner = []
            while index < len(lines) and lines[index].strip() != ":::":
                inner.append(lines[index])
                index += 1
            result.append(render_markdown("\n".join(inner), unit_routes))
            result.append("</section>")
        elif match := re.match(r"^(#{1,6})\s+(.+)$", line):
            flush()
            level, title = len(match.group(1)), match.group(2).strip()
            title = re.sub(r"\s*\(quizdown\)", "", title, flags=re.I)
            anchor = _slug(title, used)
            result.append(
                f'<h{level} id="{anchor}">{_inline(title, unit_routes)}</h{level}>'
            )
        elif (
            re.match(r"^\s*\|", line)
            and index + 1 < len(lines)
            and re.match(r"^\s*\|?\s*:?-+", lines[index + 1])
        ):
            flush()
            table = [line]
            index += 1
            while index < len(lines) and lines[index].lstrip().startswith("|"):
                table.append(lines[index])
                index += 1
            result.append(_table(table, unit_routes))
            continue
        elif re.match(r"^\s*([-+*])\s+", line) or re.match(r"^\s*\d+\.\s+", line):
            flush()
            ordered = bool(re.match(r"^\s*\d+\.\s+", line))
            items = []
            pattern = r"^\s*\d+\.\s+(.*)$" if ordered else r"^\s*[-+*]\s+(.*)$"
            while index < len(lines) and (item := re.match(pattern, lines[index])):
                items.append(f"<li>{_inline(item.group(1), unit_routes)}</li>")
                index += 1
            tag = "ol" if ordered else "ul"
            result.append(f"<{tag}>{''.join(items)}</{tag}>")
            continue
        elif line.strip() == "---":
            flush()
            result.append("<hr>")
        elif line.strip():
            paragraph.append(line)
        else:
            flush()
        index += 1
    flush()
    return "\n".join(result)


def quiz_forms(text, unit_id, start=0, review_href="#lesson-conceptos"):
    """Turn Quizdown blocks into accessible forms and reject invalid question data."""
    blocks = re.findall(
        r"(?:```\{quizdown\}\n(.*?)```|````quizdown\n(.*?)````|::: quizdown\n(.*?):::)",
        strip_frontmatter(text),
        re.S,
    )
    questions = []
    for fenced, official, div in blocks:
        block = fenced or official or div
        parts = re.split(r"^##\s+(.+)$", block, flags=re.M)
        for position in range(1, len(parts), 2):
            prompt, body = parts[position].strip(), parts[position + 1]
            options = re.findall(
                r"^\s*(?:\d+\.\s*)?-?\s*\[([ xX]?)\]\s*(.+)$", body, re.M
            )
            explanation = re.search(r"^\*([^*]+)\*\s*$", body, re.M) or re.search(
                r"^>\s*(.+)$", body, re.M
            )
            if not options:
                continue
            correct = [
                number
                for number, (mark, _) in enumerate(options)
                if mark.lower() == "x"
            ]
            if len(options) < 2 or len(correct) != 1:
                raise ValueError(f"Invalid quiz question in {unit_id}: {prompt}")
            questions.append(
                (
                    prompt,
                    options,
                    correct[0],
                    explanation.group(1) if explanation else "",
                )
            )
    if not questions:
        raise ValueError(f"No Quizdown questions found for {unit_id}")
    forms = []
    for number, (prompt, options, answer, explanation) in enumerate(questions, start):
        name = f"quiz-{unit_id}-{number}"
        choices = "".join(
            f'<label><input type="radio" name="{name}" value="{index}"> {_inline(option, {})}</label>'
            for index, (_, option) in enumerate(options)
        )
        details = (
            f"<details><summary>Explicación</summary><p>{_inline(explanation, {})}</p></details>"
            if explanation
            else ""
        )
        forms.append(
            f'<form class="quiz"><fieldset data-answer="{answer}" data-review-href="{escape(review_href)}"><legend>{_inline(prompt, {})}</legend>{choices}</fieldset><button type="submit">Comprobar respuesta</button><p class="feedback" role="status"></p>{details}</form>'
        )
    return "\n".join(forms), start + len(questions)
