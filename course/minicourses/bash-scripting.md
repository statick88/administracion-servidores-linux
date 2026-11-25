# Bash scripting para administración

## Objetivo
Aprender a automatizar una comprobación sencilla con Bash sin ejecutar cambios en el sistema.

## Conceptos clave
- Un *script* reúne órdenes repetibles en un archivo de texto.
- Las variables guardan valores; `$?` conserva el estado de la última orden.
- Las condiciones `if` permiten decidir qué mensaje mostrar.
- El permiso de ejecución y el intérprete indicado por `#!/usr/bin/env bash` son conceptos distintos.

## Ejemplo guiado
Escenario: se quiere informar si existe un directorio de registros, sin modificarlo.

```bash
#!/usr/bin/env bash
ruta="/var/log"
if [ -d "$ruta" ]; then
  printf 'Existe: %s\n' "$ruta"
else
  printf 'No existe: %s\n' "$ruta"
fi
```

1. Guarde el texto como `comprobar-registros.sh` en un entorno de práctica.
2. Lea cada línea y prediga el mensaje antes de ejecutarlo; no lo ejecute en este minicurso.
3. Cambie solo el valor de `ruta` por un directorio de práctica para razonar sobre ambos resultados.

## Ejercicio práctico
Escriba un borrador que reciba una ruta en `$1` y muestre un mensaje diferente para archivo, directorio o ruta inexistente. No incluya órdenes de borrado ni de cambio de permisos.

## Criterios de éxito
- Puede explicar qué valor compara `-d`.
- El borrador usa comillas alrededor de las variables.
- Identifica que un resultado distinto de cero comunica un fallo o condición no satisfecha.

## Referencias oficiales
- [Manual de Bash de GNU](https://www.gnu.org/software/bash/manual/)
- [Referencia de condiciones de Bash](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html)
