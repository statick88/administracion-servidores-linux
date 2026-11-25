# OpenCode: asistencia de código con revisión humana

## Objetivo
Aplicar OpenCode como apoyo para comprender y redactar cambios pequeños, sin delegar decisiones ni exponer información sensible.

## Conceptos clave
- OpenCode puede asistir en la lectura y edición de código o documentación.
- La persona usuaria define el objetivo, revisa el cambio y decide si lo conserva.
- Las solicitudes deben usar ejemplos benignos y un alcance limitado.
- Nunca incluya secretos, credenciales, claves privadas ni contenido de archivos `.env`.

## Ejemplo guiado
Formule una petición humana y verificable para una nota de práctica:

```text
Explica este bloque de Markdown en español y propone una mejora de claridad.
No cambies enlaces ni archivos fuera de la nota.
```

Revise la respuesta línea por línea. Compare el resultado con el objetivo original y conserve solo las sugerencias correctas. No solicite automatización de ataques, evasión de controles ni acceso a sistemas ajenos.

## Ejercicio práctico
Redacte una petición para mejorar el título y la lista de una guía local. Incluya el archivo permitido, el resultado esperado y una instrucción para no modificar otros archivos.

## Criterios de éxito
- Define una tarea pequeña con límites explícitos.
- Revisa manualmente la propuesta antes de aplicarla.
- Mantiene secretos y datos personales fuera de la conversación.

## Referencias
- [Documentación oficial de OpenCode](https://opencode.ai/docs)
