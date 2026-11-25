# Taller: Imagen mínima para una utilidad interna

## Escenario práctico
El área de operaciones necesita distribuir una utilidad de diagnóstico textual sin depender de la configuración del equipo de cada persona.

## Objetivo medible
Crear una imagen Docker mínima que ejecute una utilidad propia, etiquetarla y demostrar que un contenedor produce una salida esperada sin publicar puertos.

## Entorno aislado y prerrequisitos
Use Docker Desktop o Docker Engine local con una carpeta `~/taller-docker`. Requiere una imagen base con versión fija y no se deben usar datos ni secretos reales.

## Preparación
1. Confirme `docker version` y cree la carpeta de trabajo.
2. Cree un archivo `estado.sh` que imprima fecha y un mensaje de servicio ficticio.
3. Defina una etiqueta local, por ejemplo `utilidad-estado:1.0`.

## Pasos guiados
1. Escriba un `Dockerfile` que copie el script y establezca un usuario no privilegiado.
2. Use una imagen base con etiqueta específica, no `latest`.
3. Construya la imagen con la etiqueta definida.
4. Ejecute el contenedor sin puertos ni privilegios adicionales.
5. Inspeccione su salida y elimine únicamente el contenedor detenido al terminar.

## Síntesis
Explique cómo etiqueta fija, usuario no privilegiado y ausencia de puertos reducen incertidumbre y superficie de exposición.

## Entregables
`Dockerfile`, `estado.sh` y `evidencia-ejecucion.txt` con la salida del contenedor.

## Criterios de verificación observables
- El Dockerfile usa una versión fija y un usuario no privilegiado.
- El contenedor imprime fecha y mensaje esperado.
- La ejecución no declara mapeos de puertos.
