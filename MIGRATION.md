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
- **`course/minicourses/`**: trece minicursos en español. El generador publica su índice en `recursos/minicursos/index.html` y una página por tema solo con `--include-minicourses`; el índice se enlaza desde Recursos únicamente en ese caso. GitHub Pages activa la opción al compilar para producción desde `main`.
- **`course/resources/`**: guías y adaptaciones curadas registradas en `course/resources.json`; el builder publica el índice estático `recursos.html` y las subpáginas `recursos/bandit.html` y `recursos/proxmox.html` sin invocar Quarto.

## Cómo se construye el sitio

```bash
python3 tools/build_site.py --output _site   # sin dependencias externas (solo Python 3 stdlib)
python3 -m http.server -d _site 8000         # verlo en local
node --test site/*.test.mjs tests/*.test.mjs # pruebas (después de construir _site)
python3 tools/validate_site.py --site _site --production # rutas y enlaces de producción
```

El builder valida el contrato antes de escribir nada: `course/catalog.json` debe tener
`schemaVersion: 1` y exactamente 11 unidades, cada `source`/`quiz` debe existir dentro del
repo; `course/resources.json` registra las guías y adaptaciones publicables; y la salida debe
estar vacía (no sobreescribe archivos generados).

## Qué publica GitHub Pages

`.github/workflows/pages.yml` corre en Python 3.11 + Node 20 sobre `main`: builder →
pruebas → validación del artifact `_site` → deploy. Antes de subir el artifact de
producción, `tools/validate_site.py --site _site --production` exige todas las rutas
publicadas, incluidos los minicursos opcionales, y verifica enlaces locales sin consultar
sitios externos. El guard de marca se ejecuta sobre ese mismo `_site` y falla si falta la
salida. **No instala ni invoca Quarto.** Los disparadores (`paths`) cubren las entradas
reales del builder: `site/`, `tools/`, `course/`, `quizzes/`, `01-fundamentos/` …
`11-bases-datos/`, `tests/` y el propio workflow.
`tests/workflow_no_quarto.test.mjs` fija este contrato.

## Fuera del sitio publicado

El sitio publica las 11 unidades del brochure con sus quizzes y un índice de recursos estático.
Las prácticas y minicursos compatibles se adaptan de forma curada en ese índice; los textos
históricos no se renderizan directamente. La guía suplementaria de Proxmox VE avanzado
adapta de forma defensiva plantillas, LXC no privilegiado, aislamiento de red y restauración,
sin asignarla a una unidad ni publicar procedimientos de producción. Quedan fuera de
publicación las unidades 12–15, `unidades/` detalladas, wargames y contenidos que no
encajan en la malla, además de presentaciones y anexos sin adaptación revisada.
