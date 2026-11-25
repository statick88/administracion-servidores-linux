# Lectura y recursos del curso
Base: `main` en `9f34a65`. No reaplicar el stash completo ni restaurar el compilador Quarto.

## Specs
- S1: «quiero que se oculte la barra de navegacion cuando empiezo a leer o deslizar la barra de desplazamiento al entrar por ejemplo dentro de una unidad»
- S2: «debe tener el componente de: Tema, Objetivo, Conceptos, Ejemplo, Practica, Tarea, Quiz, concresion, siguiente tema por cada unidad»
- S3: «incluye las sugerencias de bandit, los minicursos actualizados, los talleres, las practicas que son muy importantes»
- S4: «Talleres nuevos por unidad»
- S5: «Main más la actualización de Proxmox»

## Tasks
- [ ] T1 — S1 — Navegación en modo lectura — delegated — commit blocked by GGA provider
- [ ] T2 — S2 — Estructura didáctica de las 11 unidades — implemented and reviewed — commit blocked by GGA provider
- [ ] T3 — S3, S5 — Minicursos, orientaciones de Bandit y prácticas existentes — resources integrated and tests green — review and commit pending
- [ ] T4 — S4 — Talleres nuevos por unidad — sources integrated and tests green — review and commit pending

## Log
- L1: incluye las sugerencias de bandit, los minicursos actualizados, los talleres, las practicas que son muy importantes
- L2: quiero que se oculte la barra de navegacion cuando empiezo a leer o deslizar la barra de desplazamiento al entrar por ejemplo dentro de una unidad, debe tener el componente de: Tema, Objetivo, Conceptos, Ejemplo, Practica, Tarea, Quiz, concresion, siguiente tema por cada unidad
- L3: Ambas barras; Conclusión.
- L4: Talleres nuevos por unidad; Main más la actualización de Proxmox.
- L5: T1: RED observado por el autor; 20/20 pruebas y `git diff --check` pasan. RDD: medium, reviewDue false. El intento de commit falló porque GGA no encuentra el binario nativo de Claude. Falta comprobación interactiva en navegador. T2: mapeo de las 11 fuentes en curso.
- L6: T2: mapeo completado; implementación delegada. T3: el stash contiene cuatro laboratorios de Proxmox en Markdown; su cambio al anexo modifica referencias y numeración (incluye rutas o unidades que no corresponden a `main`). Usar el anexo de `main` como base y evaluar los laboratorios por separado; no copiar referencias obsoletas ni artefactos de Quarto.
- L7: T2 implementada; 21/21 pruebas. Revisión nativa de la porción T1–T2 aprobada y cerrada (review-188dc97918a6f2c1). El hook GGA sigue bloqueando los commits. T3: preparación de fuentes delegada; integración pendiente.
- L8: T3: inventario, guía de Bandit y orientación de Proxmox preparados y validados estructuralmente. La conexión al sitio queda en implementación; conservar únicamente contenido compatible con la malla vigente.
- L9: T3: índice y guías publicables localmente, 11 prácticas y siete minicursos con actividades adaptadas. Actualizada la aserción obsoleta de 12 a 13 páginas; suite 22/22 y `git diff --check` pasan. Pendiente verificar el alcance de la actualización de Proxmox y cerrar la revisión y el commit. T4: redacción de los 11 talleres delegada; integración pendiente.
- L10: T4: once talleres renderizados en Recursos, cada uno enlazado desde su unidad. Prueba pública RED antes de registrar los talleres; suite GREEN 22/22 después. Sus instrucciones no se ejecutaron en entornos Linux o Docker. T3: adaptación avanzada de Proxmox en curso como complemento sin asignación forzada a una unidad.
- L11: T3: guía avanzada de Proxmox incorporada como complemento sin unidad asignada; incluye cloud-init, LXC no privilegiado y restauración en laboratorio. Suite completa 22/22, `git diff --check` y compilación aislada de 13 páginas verificados. T3/T4 aún sin commit propio; el proveedor GGA sigue pendiente.
