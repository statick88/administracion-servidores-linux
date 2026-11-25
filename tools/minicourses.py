"""Render the explicitly selected supplemental minicourses."""

from content import escape, render_markdown

GROUPS = (
    ("Herramientas de terminal", ("nvim", "zsh", "oh-my-zsh", "lazyvim", "herdr", "opencode", "ranger")),
    ("Operación de servidores", ("bash-scripting", "monitoreo", "fallos", "errores", "hardening", "zero-trust")),
)
ROUTE = "recursos/minicursos"


def render_minicourse_pages(root):
    index = ['<article><h1>Minicursos</h1><p><a href="../../recursos.html">← Volver a Recursos</a></p>']
    for group, slugs in GROUPS:
        index.append(f'<section><h2>{escape(group)}</h2><ul>')
        for slug in slugs:
            source = (root / "course/minicourses" / f"{slug}.md").read_text(encoding="utf-8")
            heading, _, body = source.partition("\n")
            if not heading.startswith("# ") or not heading[2:].strip() or not body.strip():
                raise ValueError(f"Minicourse requires a title and content: {slug}")
            title = heading[2:].strip()
            index.append(f'<li><a href="{slug}.html">{escape(title)}</a></li>')
            content = (f'<article><p><a href="index.html">← Todos los minicursos</a></p>'
                       f'<h1>{escape(title)}</h1>{render_markdown(body, {})}</article>')
            yield f"{ROUTE}/{slug}.html", title, content
        index.append('</ul></section>')
    yield f"{ROUTE}/index.html", "Minicursos", "".join(index) + '</article>'
