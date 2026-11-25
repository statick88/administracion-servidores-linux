# Taller: Informe diario de espacio con Bash

## Escenario práctico
El equipo necesita un informe sencillo para detectar temprano directorios de trabajo que ocupan demasiado espacio.

## Objetivo medible
Escribir y ejecutar un script Bash que genere un informe fechado con tamaño de tres rutas y señale al menos una ruta por encima de un umbral definido.

## Entorno aislado y prerrequisitos
Use una VM o WSL2 y una carpeta propia `~/taller-scripting`; se requieren Bash, `du`, `date` y permiso de escritura en el directorio personal.

## Preparación
1. Cree tres subdirectorios de prueba dentro de `~/taller-scripting`.
2. Coloque archivos de prueba sin datos reales en dos de ellos.
3. Decida un umbral pequeño en KiB y anótelo al inicio del script.

## Pasos guiados
1. Cree `informe_espacio.sh` con una variable de fecha y una lista de las tres rutas.
2. Recorra la lista y obtenga el tamaño de cada ruta con `du`.
3. Escriba resultados en `informe-AAAA-MM-DD.txt`.
4. Añada una condición que marque `REVISAR` cuando una ruta supere el umbral.
5. Ejecute el script dos veces y compare que el informe se actualiza sin errores.

## Síntesis
Indique qué parte del script volvería configurable si se aplicara a varias cuentas de un servidor.

## Entregables
`informe_espacio.sh`, un informe generado y un registro breve de las dos ejecuciones.

## Criterios de verificación observables
- El script tiene fecha, lista de rutas y condición de umbral.
- El informe incluye las tres rutas y al menos una marca `REVISAR`.
- Las dos ejecuciones terminan con código de salida cero.
