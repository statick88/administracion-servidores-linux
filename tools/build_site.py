#!/usr/bin/env python3
"""Build the brochure-based course using only Python's standard library."""
import argparse
import html
import json
from pathlib import Path
import re
import sys

from content import quiz_forms, render_markdown
from lesson import load_lesson_sections, render_lesson_guide
from resources import load_resources, render_resources, unit_resource_links

ROOT = Path(__file__).resolve().parents[1]
FALLBACK = '''<!doctype html><html lang="es"><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{title}}</title><nav>{{navigation}}</nav><main>{{content}}</main></html>'''


def escape(value):
    return html.escape(str(value), quote=True)


def load_catalog():
    catalog = json.loads((ROOT / 'course/catalog.json').read_text())
    if catalog.get('schemaVersion') != 1 or len(catalog.get('units', [])) != 11:
        raise ValueError('Expected schemaVersion 1 and eleven brochure units')
    ids = set()
    for unit in catalog['units']:
        if not re.fullmatch(r'[0-9]{2}-[a-z-]+', unit['id']) or unit['id'] in ids:
            raise ValueError('Invalid or duplicate unit id')
        ids.add(unit['id'])
        for key in ('source', 'quiz'):
            source = (ROOT / unit[key]).resolve()
            if not source.is_relative_to(ROOT) or not source.is_file():
                raise ValueError(f'Invalid source: {unit[key]}')
    return catalog


def page(template, title, content, navigation, base):
    values = dict(title=escape(title), content=content, navigation=navigation, base=base)
    return re.sub(r'\{\{(title|content|navigation|base)\}\}',
                  lambda match: values[match[1]], template)


def build(output):
    catalog = load_catalog()
    output = output.resolve()
    # Never overwrite source directories, including through an output symlink.
    if ROOT.is_relative_to(output) or (output.is_relative_to(ROOT)
                                      and not output.is_relative_to(ROOT / '_site')):
        raise ValueError('Use _site or an isolated output directory outside the source tree')
    template_path = ROOT / 'site/page.html'
    template = template_path.read_text() if template_path.exists() else FALLBACK
    units = catalog['units']
    guides = load_lesson_sections(ROOT / 'course/lesson-sections.json', [unit['id'] for unit in units])
    resources = load_resources(ROOT / 'course/resources.json', {unit['id'] for unit in units})
    unit_titles = {unit['id']: unit['title'] for unit in units}
    home = (f'<section class="hero"><p class="eyebrow">WSL2 · Docker · Nginx · HTTPS</p>'
            f'<h1>{escape(catalog["title"])}</h1><p>{escape(catalog["description"])}</p>'
            f'<a class="cta" href="unidades/{units[0]["id"]}.html">Empezar a estudiar →</a>'
            '<p>11 unidades · Contenido práctico en español</p></section>'
            '<section aria-labelledby="catalog-title"><h2 id="catalog-title">Recorrido del curso</h2>'
            '<div class="catalog" id="catalogo">')
    for index, unit in enumerate(units, 1):
        home += (f'<section class="module" data-search><span class="badge">UNIDAD {index:02}</span>'
                 f'<h3><a href="unidades/{unit["id"]}.html">{escape(unit["title"])}</a></h3>'
                 '<ul>' + ''.join(f'<li>{escape(topic)}</li>' for topic in unit['topics']) + '</ul></section>')
    home += '</div></section><section><h2>Requisitos de inscripción</h2><ul>'
    home += ''.join(f'<li>{escape(item)}</li>' for item in catalog['requirements'])
    home += (f'</ul></section><section><h2>Recursos complementarios</h2>'
             '<p>Consulta guías seguras, prácticas existentes y minicursos compatibles con la malla actual.</p>'
             '<p><a href="recursos.html">Ver recursos</a></p></section>'
             f'<p>{escape(catalog["author"])}</p>')
    planned = {
        'index.html': page(template, catalog['title'], home, '', './'),
        'recursos.html': page(template, 'Recursos', render_resources(resources, ROOT, unit_titles), '', './'),
    }
    for index, unit in enumerate(units):
        navigation = '<a href="../index.html">← Todas las unidades</a><ul>'
        for other in units:
            current = ' aria-current="page"' if other == unit else ''
            navigation += (f'<li data-search><a href="{other["id"]}.html"{current}>'
                           f'{escape(other["title"])}</a></li>')
        navigation += '</ul>'
        source = (ROOT / unit['source']).read_text()
        unit_routes = {item['id']: f"../{item['id']}.html" for item in units}
        lesson = render_markdown(source, unit_routes)
        internal_quiz, offset = ('', 0)
        if 'quizdown' in source:
            internal_quiz, offset = quiz_forms(source, unit['id'])
        external_quiz, _ = quiz_forms((ROOT / unit['quiz']).read_text(), unit['id'], offset)
        if index + 1 < len(units):
            next_unit = units[index + 1]
            next_href, next_title = f'{next_unit["id"]}.html', next_unit['title']
        else:
            next_href, next_title = '../index.html', 'Volver al catálogo del curso'
        guide = render_lesson_guide(guides[unit['id']], next_href, next_title)
        related_resources = unit_resource_links(resources, unit['id'], '../')
        content = f'<article>{guide}{lesson}{related_resources}<section id="evaluaciones" aria-label="Evaluaciones">{internal_quiz}{external_quiz}</section></article>'
        planned[f'unidades/{unit["id"]}.html'] = page(template, unit['title'], content, navigation, '../')
    for name in ('style.css', 'app.js'):
        asset = ROOT / 'site' / name
        if asset.exists():
            planned[f'assets/{name}'] = asset.read_text()
    # Validate every destination before the first write. Do not remove existing files.
    for relative in planned:
        destination = (output / relative).resolve()
        if not destination.is_relative_to(output):
            raise ValueError(f'Output path escapes destination: {relative}')
        if destination.exists():
            raise ValueError('Output must be fresh; existing generated files are not overwritten')
    for relative, content in planned.items():
        destination = output / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(content, encoding='utf-8')
    print(f'Built {sum(path.endswith(".html") for path in planned)} pages.')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=ROOT / '_site',
                        help='fresh output directory (default: _site); existing files are never overwritten')
    args = parser.parse_args()
    try:
        build(args.output)
    except (OSError, ValueError, KeyError) as error:
        print(f'Build failed: {error}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
