# Taller: Sitio local con Apache

## Escenario práctico
Un equipo debe comprobar que Apache puede servir contenido de prueba sin publicar un servicio fuera del equipo.

## Objetivo medible
Servir una página estática con un virtual host limitado a `localhost`, validar su configuración y registrar una respuesta HTTP local.

## Entorno aislado y prerrequisitos
Use una VM o contenedor local. Apache debe escuchar solo en `127.0.0.1`; no use dominios, datos ni servidores de producción.

## Diseño de Apache HTTP Server 2.4
Trabaje exclusivamente con Apache HTTP Server 2.4 en una VM o contenedor. Reserve `127.0.0.1:8080` para el taller; no reutilice un sitio, certificado ni `DocumentRoot` ajeno.

- **Virtual host:** una definición separada para el nombre `localhost`.
- **Política de directorio:** deniegue por defecto y permita solo la carpeta de práctica con `Require local`.
- **Módulos:** compruebe `mpm_event`, `authz_core` y `mime`; `rewrite` es opcional para observar un módulo habilitado, no para redirigir fuera del equipo.
- **Registros:** use archivos propios del taller para distinguir la evidencia de `access.log` y `error.log` generales.

## Configuración de práctica
Guarde una copia de la configuración existente fuera de esta guía y cree `virtualhost-local.conf` con rutas de laboratorio. El puerto y todas las direcciones permanecen en loopback.

```apache
Listen 127.0.0.1:8080

<VirtualHost 127.0.0.1:8080>
    ServerName localhost
    DocumentRoot "/srv/taller-apache/public"
    ErrorLog "/srv/taller-apache/logs/error.log"
    CustomLog "/srv/taller-apache/logs/access.log" combined

    <Directory "/srv/taller-apache/public">
        Options -Indexes
        AllowOverride None
        Require local
    </Directory>
</VirtualHost>
```

La política `Require local` acepta únicamente conexiones de loopback. `Options -Indexes` evita listar directorios y `AllowOverride None` impide que un `.htaccess` cambie el alcance del ejercicio.

## Pasos guiados y observación
1. Cree `public/index.html` con una marca inequívoca, por ejemplo `Apache local IX`, y prepare la carpeta `logs`.
2. Habilite la definición según el mecanismo de la imagen del laboratorio; en Debian, confirme los módulos antes de habilitar el sitio.
3. Revise el archivo: el único `Listen` y el `<VirtualHost>` deben indicar `127.0.0.1:8080`.
4. Valide sintaxis. Solo si el responsable del laboratorio ya inició Apache, consulte la ruta desde la misma VM y compare la marca con el registro.

```bash
$ apachectl -M | grep -E 'mpm_event|authz_core|mime|rewrite'  # <1>
$ apachectl -t  # <2>
$ curl --silent --show-error --include http://127.0.0.1:8080/  # <3>
$ tail -n 1 /srv/taller-apache/logs/access.log  # <4>
```



1. Confirma los módulos cargados; `rewrite` puede aparecer o no, pero no se necesita para publicar el sitio.
2. Comprueba la sintaxis sin recargar ni iniciar Apache.
3. Obtiene cabeceras y el cuerpo solamente por loopback; guarde el resultado saneado como evidencia.
4. Relaciona una petición local con una línea del registro específico del taller.

## Evidencia y rollback
La evidencia mínima incluye: salida satisfactoria de `apachectl -t`, respuesta HTTP con la marca de `index.html`, una línea de `access.log` con `127.0.0.1` y, si hay incidencias, la línea pertinente de `error.log`. No incluya IP externas, credenciales ni registros ajenos.

### Rollback
Quite la inclusión del virtual host de práctica, restaure la copia local que tomó antes del ejercicio y conserve los archivos de evidencia. No ejecute recargas, reinicios ni detenciones desde esta guía: el responsable del entorno aplica su procedimiento local tras validar la configuración restaurada.

## Entregables

:::{.callout-note}
La respuesta y el registro se revisan solo en localhost.
:::

```text
host=localhost
```
`virtualhost-local.conf`, `index.html` y evidencia saneada de validación, respuesta y registro.

## Criterios de verificación observables
- Apache escucha únicamente en localhost.
- La validación ocurre antes de la recarga.
- La evidencia corresponde a contenido y registros locales.
