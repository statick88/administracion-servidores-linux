# Interpretación de errores y códigos de salida

## Objetivo
Interpretar mensajes y códigos de salida para comunicar un problema con precisión antes de intentar corregirlo.

## Conceptos clave
- Un mensaje de error describe una condición detectada por una herramienta.
- El código de salida comunica el resultado al proceso que invocó la orden.
- En la shell, `0` suele indicar éxito y un valor distinto de cero una condición no exitosa.
- El mismo código puede tener significado específico según la herramienta; consulte su documentación.

## Ejemplo guiado
Escenario: una orden informa que no puede abrir un archivo solicitado.

1. Copie el mensaje completo, la orden empleada y la hora; no descarte el contexto.
2. Identifique el programa que emitió el mensaje y la ruta o argumento citado.
3. Consulte conceptualmente `echo $?` inmediatamente después para observar el código de salida.
4. Compruebe en la documentación del programa qué significa ese código antes de cambiar permisos o rutas.
5. Describa una causa posible como hipótesis, no como conclusión sin evidencia.

No ejecute órdenes administrativas desde este minicurso; practique la lectura de salidas en ejemplos preparados.

## Ejercicio práctico
Clasifique tres casos ficticios: archivo inexistente, opción no válida y acceso denegado. Para cada uno, anote mensaje, código esperado, evidencia que falta y siguiente consulta segura.

## Criterios de éxito
- Distingue texto diagnóstico de código de salida.
- Evita afirmar que todo código no cero tiene la misma causa.
- Puede redactar un informe breve con orden, salida, contexto y fuente consultada.

## Referencias oficiales
- [Manual de Bash: estado de salida](https://www.gnu.org/software/bash/manual/html_node/Exit-Status.html)
- [Manual de Bash: parámetros especiales](https://www.gnu.org/software/bash/manual/html_node/Special-Parameters.html)
- [GNU Coding Standards: códigos de salida](https://www.gnu.org/prep/standards/html_node/Errors.html)
