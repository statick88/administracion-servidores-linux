# Calidad del curso
Correcciones de la auditoría local. Conservar el cambio de navegación previo. Sin publicación en este alcance.

## Specs
- S1: «procede con la recomendacion»

## Tasks
- [x] T1 — S1 — Ejemplos seguros de Docker y bases de datos — delegated; static verification passed — `bb46cd5`
- [x] T2 — S1 — Acceso a práctica, feedback del quiz y buscador — delegated; automated verification passed — `17ed6e0`
- [x] T3 — S1 — Validación del artefacto de publicación — delegated; local verification passed — `2f75ed3`

## Log
- L1: procede con la recomendacion
- L2: Alcance de la recomendación inmediatamente anterior: «corregir los ejemplos de Docker y bases de datos; después, conectar práctica y evaluación; por último, ajustar el buscador y añadir la validación del artefacto a CI».
- L3: Suite integrada: 33/33. Artefacto estándar de 15 páginas y de producción de 29 páginas: validación aprobada. T1 y T2 confirmados en commits locales; T3 en proceso de commit. Verificación independiente y revisión de las porciones de riesgo pendientes.
- L4: Revisión nativa aprobada para T2 (`review-2651f9c036667797`) y T3 (`review-50b1630d48f06afa`). Tras los commits, se verificaron nuevamente 33/33 pruebas y ambos artefactos con HEAD estable. Sin ejecución de Docker, sin nueva prueba del recorrido completo en navegador y sin publicación.
