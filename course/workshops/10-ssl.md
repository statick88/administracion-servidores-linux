# Taller: Plan de renovación HTTPS sin exposición pública

## Escenario práctico
Un equipo va a habilitar HTTPS para un sitio futuro, pero primero debe comprobar localmente la redirección y dejar un plan de renovación sin solicitar certificados para dominios no controlados.

## Objetivo medible
Configurar y verificar en laboratorio una redirección HTTP→HTTPS con material de prueba local, y documentar los datos necesarios para una renovación real.

## Entorno aislado y prerrequisitos
Use una VM o contenedor local con Nginx. Trabaje con `localhost` y un certificado autofirmado de laboratorio; no ejecute Certbot ni solicite certificados para dominios ajenos.

## Preparación
1. Cree una página local de prueba y una copia de la configuración de Nginx.
2. Genere un certificado autofirmado únicamente para `localhost` siguiendo la política del laboratorio.
3. Defina una ventana de renovación ficticia y un responsable técnico ficticio.

## Pasos guiados
1. Configure un servidor HTTP local que redirija a HTTPS.
2. Configure el servidor HTTPS con el certificado de laboratorio y la página de prueba.
3. Valide la configuración antes de recargar Nginx.
4. Compruebe con `curl -I` que HTTP responde con redirección y que HTTPS entrega la página local.
5. Redacte `plan-renovacion.md` con dominio autorizado, responsable, fecha de revisión y método de verificación.

## Síntesis
Diferencie la prueba local de una emisión real y explique por qué la propiedad del dominio es necesaria para automatizar certificados públicos.

## Entregables
`plan-renovacion.md` y evidencia de la redirección local y de la respuesta HTTPS de laboratorio.

## Criterios de verificación observables
- HTTP local responde con una redirección hacia HTTPS.
- HTTPS entrega el contenido de prueba en el entorno aislado.
- El plan identifica responsable, revisión y dominio autorizado sin incluir secretos.
