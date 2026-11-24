# Interfaz del sitio

`page.html` es la plantilla que usa `tools/build_site.py`. Sus rutas usan `{{base}}` para funcionar tanto en la portada como en `unidades/` bajo GitHub Pages.

La búsqueda filtra los elementos marcados con `data-search` y anuncia el resultado. Los quizzes son deliberadamente de opción múltiple: la respuesta correcta está en `data-answer` del HTML generado y, por tanto, es visible en el cliente. La retroalimentación es educativa e inmediata; no registra progreso ni pretende ser una evaluación segura.

Ejecuta `node --test site/*.test.mjs` para las pruebas de la interfaz y del constructor.
