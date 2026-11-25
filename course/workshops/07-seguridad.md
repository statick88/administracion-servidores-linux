# Taller: Línea base defensiva de un servicio local

## Escenario práctico
Antes de poner en uso un servicio de demostración local, el equipo debe documentar qué acceso necesita y aplicar una política mínima que no exponga puertos innecesarios.

## Objetivo medible
Construir una línea base defensiva para un servicio local: identificar su puerto de escucha, permitir solo el tráfico local necesario y documentar una política de recuperación.

## Entorno aislado y prerrequisitos
Use una VM o contenedor local aislado. El único objetivo autorizado es `localhost`; no escanee, pruebe ni exponga otros equipos, dominios o puertos públicos. Requiere UFW solo si está instalado.

## Preparación
1. Tome una instantánea o prepare un contenedor nuevo.
2. Elija un servicio local conocido y documente su finalidad.
3. Consulte puertos en escucha con herramientas de inventario local, como `ss -ltn`.

## Pasos guiados
1. Registre el puerto y dirección de escucha del servicio en `linea-base.md`.
2. Si usa UFW, revise el estado actual antes de cambiarlo.
3. Defina una regla mínima que permita solo el acceso local requerido; conserve el acceso administrativo de la VM.
4. Verifique el servicio desde `localhost` y compruebe el estado de la política.
5. Documente cómo revertir la regla en la misma sesión si interrumpe el servicio.

## Síntesis
Relacione inventario, mínimo privilegio y reversibilidad con una operación segura de firewall.

## Entregables
`linea-base.md`, captura del estado del firewall o justificación si UFW no está disponible, y una lista de reversión.

## Criterios de verificación observables
- La evidencia identifica un único servicio local y su puerto.
- La política no publica el servicio hacia redes externas.
- La lista de reversión permite recuperar el estado previo sin adivinar pasos.
