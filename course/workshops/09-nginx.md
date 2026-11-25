# Taller: Página de mantenimiento local con Nginx

## Escenario práctico
Durante una actualización planificada, un servicio necesita mostrar una página de mantenimiento clara sin depender de una aplicación externa.

## Objetivo medible
Servir una página HTML local con Nginx, añadir un encabezado de identificación y verificar respuesta HTTP y registro de acceso.

## Entorno aislado y prerrequisitos
Use una VM o contenedor local. Nginx debe escuchar solo en `127.0.0.1` o en una red privada del laboratorio; no publique el servicio a Internet.

## Preparación
1. Cree `~/taller-nginx/site` y un `index.html` con hora estimada de retorno ficticia.
2. Instale o inicie Nginx en el entorno aislado.
3. Identifique el archivo de configuración específico del sitio y haga una copia local antes de editarlo.

## Pasos guiados
1. Configure un bloque de servidor para la ruta de su sitio y escucha local.
2. Añada el encabezado `X-Taller-Mantenimiento: activo`.
3. Valide la configuración con `nginx -t` antes de recargar.
4. Consulte la página con `curl -I` y con un navegador local.
5. Localice la petición en el registro de acceso y anote hora y código HTTP.

## Síntesis
Explique por qué validar configuración antes de recargar evita convertir un cambio pequeño en una indisponibilidad.

## Entregables
`configuracion-nginx.md`, `index.html` y evidencia de encabezado, código HTTP y registro de acceso.

## Criterios de verificación observables
- `nginx -t` informa configuración válida.
- La respuesta local tiene código 200 y el encabezado solicitado.
- El registro contiene una petición a la página de mantenimiento.
