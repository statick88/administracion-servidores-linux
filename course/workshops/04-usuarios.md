# Taller: Acceso mínimo para una cuenta de soporte

## Escenario práctico
Una técnica temporal debe consultar el estado de un servicio, pero no necesita administrar cuentas ni acceder como superusuario de forma permanente.

## Objetivo medible
Crear en una VM una cuenta de prueba con acceso de lectura a un informe y una regla `sudo` limitada a consultar el estado de un único servicio.

## Entorno aislado y prerrequisitos
Use exclusivamente una VM o contenedor local desechable con una cuenta administrativa. Emplee el usuario ficticio `soporte_taller`; no use contraseñas reales ni sistemas remotos.

## Preparación
1. Tome una instantánea de la VM o prepare un contenedor nuevo.
2. Cree `~/taller-usuarios/estado.txt` con contenido ficticio.
3. Verifique qué servicio local se puede consultar con `systemctl status` sin reiniciarlo ni modificarlo.

## Pasos guiados
1. Cree el grupo local `soporte` y la cuenta `soporte_taller` sin datos personales.
2. Asigne al grupo permiso de lectura sobre el informe y confirme que otros usuarios no lo leen.
3. Mediante `visudo`, limite `sudo` de ese grupo al comando de consulta del servicio elegido.
4. Inicie sesión como `soporte_taller` y pruebe la lectura y la consulta autorizada.
5. Intente una operación administrativa no autorizada y registre el rechazo, sin forzar ni eludir controles.

## Síntesis
Explique cómo el principio de mínimo privilegio reduce el impacto de un error de la cuenta temporal.

## Entregables
Una transcripción de pruebas con identidades ficticias y `politica-acceso.md` que describa permisos y límite de `sudo`.

## Criterios de verificación observables
- La cuenta solo lee el informe mediante su grupo.
- La regla de `sudo` permite una consulta concreta y no una administración general.
- La transcripción muestra un rechazo de una acción fuera del alcance.
