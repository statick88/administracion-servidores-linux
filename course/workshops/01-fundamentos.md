# Taller: Puesto Linux listo para soporte

## Escenario práctico
Una persona de soporte recibe un equipo nuevo y debe dejar un entorno Linux utilizable sin modificar el sistema anfitrión.

## Objetivo medible
Crear una sesión Linux aislada, identificar distribución, núcleo, usuario y directorio de trabajo, y registrar los cuatro datos correctamente.

## Entorno aislado y prerrequisitos
Use WSL2 o una máquina virtual local con una distribución Linux. Requiere terminal y 2 GB libres; no use cuentas ni datos institucionales.

## Preparación
1. Cree la carpeta `~/taller-fundamentos`.
2. Compruebe que puede abrir una terminal en la distribución elegida.
3. Anote si trabaja en WSL2 o VM y por qué esa opción evita alterar el anfitrión.

## Pasos guiados
1. Consulte la identidad del sistema con `uname -a` y `cat /etc/os-release`.
2. Registre usuario y ruta actual con `whoami` y `pwd`.
3. Cree `inventario.txt` con esos cuatro datos y una línea sobre la finalidad de `/home`, `/etc` y `/var`.
4. Cierre y abra otra terminal; confirme que el archivo sigue disponible.

## Síntesis
Explique cómo el aislamiento elegido permite practicar administración sin reformatear ni cambiar el equipo anfitrión.

## Entregables
`inventario.txt` y una captura donde se vea la terminal, el usuario y la fecha del sistema.

## Criterios de verificación observables
- `inventario.txt` contiene distribución, núcleo, usuario y ruta.
- Las tres rutas del FHS tienen una finalidad correcta.
- El archivo se puede leer desde una segunda sesión.
