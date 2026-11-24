# Migración: de Quarto a sitio estático

Este documento resume cómo se dejó de usar Quarto para construir y publicar el curso,
siguiendo el precedente del ebook de `practicas` (`tools/build_site.py`,
`course/catalog.json`, tests Node).

## Qué cambió

| Antes (Quarto) | Ahora |
| --- | --- |
| `quarto preview` / `quarto render` | `python3 tools/build_site.py --output _site` |
| Salida en `docs/` | Salida en `_site/` (no se versiona) |
| Workflow de Pages instalaba Quarto y renderizaba | Workflow ejecuta `node --test` y el builder de Python |
| `_quarto.yml` raíz con 18 filtros + `_extensions/` (100 archivos) | Eliminados: nada los carga |
| Renders `0N/index.html` versionados en el repo | Eliminados: la salida vive en `_site/` |

## Qué se conserva

- **Las fuentes `.qmd`** (`01-fundamentos/` … `11-bases-datos/`, `unidades/`, `quizzes/`,
  `anexos/`, `lab-practicos/`, `practicas/`): son el contenido vivo que lee
  `tools/build_site.py` y el material de referencia del curso.
- **`presentaciones/`**: subproyecto independiente con su propio `presentaciones/_quarto.yml`
  (`project.type: website`). Se renderiza aparte con Quarto y queda fuera del sitio publicado.
- **`recursos/`**: material de apoyo, también fuera del sitio publicado.

## Cómo se construye el sitio

```bash
python3 tools/build_site.py --output _site   # sin dependencias externas (solo Python 3 stdlib)
python3 -m http.server -d _site 8000         # verlo en local
node --test site/*.test.mjs tests/*.test.mjs # pruebas
```

El builder valida el contrato antes de escribir nada: `course/catalog.json` debe tener
`schemaVersion: 1` y exactamente 11 unidades, cada `source`/`quiz` debe existir dentro del
repo, y la salida debe estar vacía (no sobreescribe archivos generados).

## Qué publica GitHub Pages

`.github/workflows/pages.yml` corre en Python 3.11 + Node 20 sobre `main`: pruebas →
builder → artifact `_site` → deploy. **No instala ni invoca Quarto.** Los disparadores
(`paths`) cubren las entradas reales del builder: `site/`, `tools/`, `course/`,
`quizzes/`, `01-fundamentos/` … `11-bases-datos/`, `tests/` y el propio workflow.
`tests/workflow_no_quarto.test.mjs` fija este contrato.

## Fuera del sitio publicado

Por decisión de alcance, el sitio solo publica las 11 unidades del brochure con sus quizzes.
Quedan en el repo como fuentes, sin publicar: unidades 12–15, `unidades/` detalladas,
laboratorios, prácticas, wargames, presentaciones y anexos.
