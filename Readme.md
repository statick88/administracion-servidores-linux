# Administración de Servidores Linux

Material del curso profesional.

Instructor: Diego Saavedra (https://statick88.github.io)

## Acceso rápido

- Sitio (publicado): `https://statick88.github.io/administracion-servidores-linux/`
- Sitio (HTML generado): `_site/index.html`
- Diapositivas (Reveal.js): `docs/presentaciones/index.html`
- Guía de entorno: `SETUP.qmd` (fuente: `SETUP.md`)

## Ejecutar en local

- Construir el sitio (sin dependencias externas): `python3 tools/build_site.py --output _site`
- Ver el sitio generado: `python3 -m http.server -d _site 8000`
- Ejecutar las pruebas: `node --test site/*.test.mjs tests/*.test.mjs`
- Preview del ebook (fuente `.qmd`, requiere Quarto): `quarto preview`
- Render de las diapositivas (requiere Quarto): `quarto render presentaciones`

## Estructura

- `site/`, `tools/`, `course/`: constructor del sitio estático
- `01-fundamentos/` … `11-bases-datos/`: contenido por unidad (fuentes `.qmd`)
- `lab-practicos/`: laboratorios
- `presentaciones/`: subproyecto de slides (Reveal.js)
- `_site/`: salida HTML generada (no se versiona)
