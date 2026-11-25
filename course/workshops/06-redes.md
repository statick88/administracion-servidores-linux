# Taller: Montaje local verificable

## Escenario práctico
Un servidor de archivos de pruebas debe montar un volumen local de manera persistente sin dejar una configuración que impida el arranque.

## Objetivo medible
Crear un sistema de archivos en un dispositivo virtual o archivo de imagen, montarlo en una ruta propia y validar una entrada persistente de forma segura.

## Entorno aislado y prerrequisitos
Use una VM desechable con un disco virtual adicional o un archivo de imagen de 256 MiB. Requiere privilegios administrativos. No modifique discos del anfitrión ni `/etc/fstab` sin copia de seguridad.

## Preparación
1. Tome una instantánea y confirme el dispositivo virtual con `lsblk`.
2. Cree `/mnt/taller-datos`.
3. Haga una copia fechada de `/etc/fstab` dentro de su directorio de trabajo.

## Pasos guiados
1. Formatee únicamente el dispositivo virtual identificado en la preparación.
2. Obtenga su UUID y móntelo temporalmente en `/mnt/taller-datos`.
3. Cree un archivo de prueba y confirme que se puede leer.
4. Redacte una entrada propuesta para `fstab` usando UUID y la opción `nofail`.
5. Valide la sintaxis con `mount -a` y confirme que no informa errores.

## Síntesis
Explique por qué UUID y `nofail` ayudan a reducir fallos por cambios de nombre o ausencia del volumen.

## Entregables
`montaje.md` con el UUID redactado, la entrada validada y evidencia de lectura del archivo de prueba.

## Criterios de verificación observables
- El montaje usa únicamente el dispositivo virtual declarado.
- El archivo de prueba se lee desde el punto de montaje.
- `mount -a` termina sin mensajes de error.
