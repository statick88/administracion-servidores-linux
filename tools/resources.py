"""Validated, static resource listings for the public course site."""
import json
import re
from pathlib import Path

from content import escape, render_markdown


SAFE_GUIDE = "guide"
WORKSHOP = "workshop"
LISTING = "listing"
OUT_OF_SCOPE = "out-of-scope"
GUIDE_PAGES = {
    "bandit": ("Bandit", ("bandit-pistas-seguras",)),
    "proxmox": ("Proxmox VE", ("proxmox-fundamentos-compatibles", "proxmox-avanzado")),
}
GUIDE_ROUTES = {identifier: f"recursos/{slug}.html"
                for slug, (_, identifiers) in GUIDE_PAGES.items() for identifier in identifiers}


def load_resources(path: Path, unit_ids):
    """Load resource records and reject unpublished or unregistered content."""
    data = json.loads(path.read_text(encoding="utf-8"))
    if data.get("schemaVersion") != 1 or not isinstance(data.get("resources"), list):
        raise ValueError("Expected resource schemaVersion 1 and resources list")
    resources, ids = [], set()
    for item in data["resources"]:
        identifier = item.get("id", "")
        if not re.fullmatch(r"[a-z0-9-]+", identifier) or identifier in ids:
            raise ValueError("Invalid or duplicate resource id")
        if not item.get("title") or item.get("publication") not in {SAFE_GUIDE, WORKSHOP, LISTING, OUT_OF_SCOPE}:
            raise ValueError(f"Invalid resource: {identifier}")
        units = item.get("units", [])
        if not isinstance(units, list) or not set(units).issubset(unit_ids):
            raise ValueError(f"Invalid resource unit mapping: {identifier}")
        source = item.get("source", "")
        if item["publication"] == LISTING and not isinstance(item.get("material"), str):
            raise ValueError(f"Missing curated material: {identifier}")
        if item["publication"] in {SAFE_GUIDE, WORKSHOP}:
            source_path = (path.parents[1] / source).resolve()
            root = path.parents[1].resolve()
            if not source_path.is_relative_to(root) or not source_path.is_file():
                raise ValueError(f"Invalid resource source: {source}")
        ids.add(identifier)
        resources.append(item)
    return resources


def _resource_link(resource, base):
    identifier = resource["id"]
    route = GUIDE_ROUTES.get(identifier, "recursos.html")
    return f'<a href="{base}{route}#{escape(identifier)}">{escape(resource["title"])}</a>'


def unit_resource_links(resources, unit_id, base):
    matched = [item for item in resources if item.get("publication") != OUT_OF_SCOPE and unit_id in item.get("units", [])]
    if not matched:
        return ""
    links = "".join(f"<li>{_resource_link(item, base)}</li>" for item in matched)
    return f'<section class="related-resources"><h2>Recursos relacionados</h2><ul>{links}</ul></section>'


def _render_resource_material(material, resource_routes):
    """Render material and map only registered reader source identifiers to local routes."""
    rendered = render_markdown(material, resource_routes)
    for identifier, route in resource_routes.items():
        rendered = rendered.replace(f'href="{escape(identifier)}.html"',
                                    f'href="{escape(route)}.html"')
    return rendered


def render_resources(resources, root, unit_titles, resource_routes, *, include_minicourses=False):
    """Render registered resources with an explicit allowlist of local reader routes."""
    guides = [item for item in resources if item["publication"] == SAFE_GUIDE]
    listings = [item for item in resources if item["publication"] == LISTING]
    excluded = [item for item in resources if item["publication"] == OUT_OF_SCOPE]
    content = ('<article><h1>Recursos</h1>'
               '<p>Material complementario revisado para la malla vigente. Los recursos se presentan con su alcance; no se publican fuentes históricas ni procedimientos fuera de ese alcance.</p>')
    if include_minicourses:
        content += ('<section><h2>Minicursos</h2><p><a href="recursos/minicursos/index.html">'
                    'Ver minicursos de terminal y operación de servidores</a></p></section>')
    workshops = [item for item in resources if item["publication"] == WORKSHOP]
    for heading, items in (("Guías publicadas", guides), ("Talleres por unidad", workshops)):
        if not items:
            continue
        section_id = ' id="talleres"' if items is workshops else ''
        content += f'<section{section_id}><h2>{heading}</h2>'
        for item in items:
            if item["id"] in GUIDE_ROUTES:
                content += f'<p id="{escape(item["id"])}">{_resource_link(item, "")}</p>'
                continue
            source = (root / item["source"]).read_text(encoding="utf-8")
            if item["publication"] == WORKSHOP and source.startswith("# "):
                source = source.partition("\n")[2]
            content += f'<section id="{escape(item["id"])}"><h3>{escape(item["title"])}</h3>{render_markdown(source, {})}</section>'
        content += '</section>'
    content += '<section><h2>Prácticas existentes y minicursos compatibles</h2>'
    for item in listings:
        units = ", ".join(unit_titles[unit] for unit in item.get("units", []))
        content += (f'<section id="{escape(item["id"])}"><h3>{escape(item["title"])}</h3>'
                    f'<p>{escape(item["scope"])} <em>Unidad: {escape(units)}.</em></p>'
                    f'{_render_resource_material(item["material"], resource_routes)}</section>')
    content += '</section><section><h2>Fuera de alcance curricular actual</h2><ul>'
    for item in excluded:
        content += f'<li id="{escape(item["id"])}"><strong>{escape(item["title"])}</strong>: {escape(item["scope"])}</li>'
    return content + '</ul></section></article>'


def render_guide_pages(resources, root):
    guides = {item["id"]: item for item in resources if item["publication"] == SAFE_GUIDE}
    for slug, (title, identifiers) in GUIDE_PAGES.items():
        content = (f'<article><p><a href="../recursos.html">← Volver a Recursos</a></p>'
                   f'<h1>{escape(title)}</h1>')
        for identifier in identifiers:
            guide = guides[identifier]
            source = (root / guide["source"]).read_text(encoding="utf-8")
            if source.startswith("# "):
                source = source.partition("\n")[2]
            content += (f'<section id="{escape(identifier)}"><h2>{escape(guide["title"])}</h2>'
                        f'{render_markdown(source, {})}</section>')
        yield f"recursos/{slug}.html", title, content + '</article>'
