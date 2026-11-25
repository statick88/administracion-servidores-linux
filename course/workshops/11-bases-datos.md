# Taller: Respaldo verificable de una base de datos en contenedor

## Escenario práctico
Una aplicación de inventario ficticia usa una base de datos en Docker y el equipo debe demostrar que puede recuperar datos de prueba antes de un despliegue.

## Objetivo medible
Levantar una base de datos con volumen nombrado, cargar tres registros sintéticos, crear un respaldo y restaurarlo en una instancia de prueba para comparar el recuento.

## Entorno aislado y prerrequisitos
Use Docker local y datos completamente ficticios. Requiere Docker Compose y una imagen de PostgreSQL o MySQL con versión fija. No exponga puertos fuera de `localhost` ni use credenciales reales.

## Preparación
1. Cree `~/taller-bd-contenedor` con un archivo Compose de versión fija.
2. Defina un volumen nombrado y variables de ejemplo en un archivo local no reutilizable.
3. Prepare una tabla `inventario_demo` con tres artículos ficticios.

## Pasos guiados
1. Inicie la base de datos y confirme que el contenedor está saludable.
2. Cree la tabla e inserte los tres registros sintéticos.
3. Ejecute una consulta de recuento y guarde el resultado.
4. Genere un respaldo en un archivo de su carpeta de taller.
5. Restaure el respaldo en una base o contenedor de prueba y compare el recuento con el original.

## Síntesis
Explique por qué un archivo de respaldo no es evidencia suficiente hasta que una restauración verificable confirma su contenido.

## Entregables
`compose.yaml`, el respaldo, `verificacion-restauracion.md` y captura del recuento en origen y destino.

## Criterios de verificación observables
- Compose declara imagen con versión fija y volumen nombrado.
- Origen y destino muestran el mismo recuento de tres registros ficticios.
- Ningún puerto está publicado más allá de la interfaz local, si se publica alguno.
