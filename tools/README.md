# Constructor del curso

Desde la raíz del repositorio:

```sh
python3 tools/build_site.py --help
python3 tools/build_site.py --output _site
node --test site/*.test.mjs tests/*.test.mjs
python3 -m http.server 8000 --directory _site
```

Solo requiere Python 3.10+ y Node.js 22+ para las pruebas. No instala ni ejecuta Quarto y nunca ejecuta los comandos de las lecciones.

`course/catalog.json` define las once unidades del brochure, sus fuentes, sus quizzes y los subtemas publicados. El material adicional permanece en el repositorio, fuera del sitio.

El directorio de salida debe ser nuevo o estar vacío: el constructor rechaza sobrescribir archivos existentes y no elimina nada. Para otra construcción elegí un directorio de salida nuevo mediante `--output`. No uses el directorio de fuentes como destino.

Esta primera unidad de implementación publica el catálogo y las rutas; el conversor de Markdown y las evaluaciones se incorporan en la siguiente unidad. La plantilla opcional `site/page.html` recibe `{{title}}`, `{{content}}`, `{{navigation}}` y `{{base}}`; los recursos de producción se copian exclusivamente desde `site/style.css` y `site/app.js`.
