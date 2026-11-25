# Taller: Entrada web local con Nginx y Apache

## Escenario práctico
Una aplicación ficticia necesita comparar Apache y Nginx como componentes web sin exponerla a Internet.

## Objetivo medible
Comprobar una página local servida por Apache detrás de Nginx y documentar el proxy inverso `localhost`; TLS es un complemento de laboratorio con certificado para `localhost`.

## Entorno aislado y prerrequisitos
Use una VM o contenedor local y `localhost`. No solicite certificados públicos ni abra puertos externos.

## Topología local y `nginx.conf`
Use puertos distintos: Apache conserva `127.0.0.1:8080` y Nginx recibe en `127.0.0.1:8081`. No use `0.0.0.0`, nombres públicos ni una IP de la LAN. Edite una copia de `nginx.conf` del entorno de práctica y mantenga cada bloque `server` explícito.

```nginx
http {
    access_log /srv/taller-web/logs/nginx-access.log;
    error_log  /srv/taller-web/logs/nginx-error.log warn;

    server {
        listen 127.0.0.1:8081;
        server_name localhost;
        location = /estado { return 200 "nginx local X\n"; }
    }

    server {
        listen 127.0.0.1:8081;
        server_name apache.localhost;
        location / {
            proxy_pass http://127.0.0.1:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
    }
}
```

El primer bloque ofrece una observación directa de Nginx. El segundo reenvía solo a Apache en loopback; `apache.localhost` se usa únicamente como cabecera `Host` en una petición a `127.0.0.1`, sin DNS ni exposición externa.

## Pasos guiados y observación
1. Conserve el Apache del taller IX como backend y revise que su virtual host siga ligado a `127.0.0.1:8080`.
2. Cree las carpetas de registros del taller y transcriba los dos bloques en la copia de `nginx.conf`.
3. Inspeccione cada `listen`, `server_name` y `proxy_pass` antes de cualquier cambio operativo.
4. Valide Nginx. Solo si ambos procesos ya fueron iniciados por el responsable del laboratorio, consulte `/estado` y la ruta proxificada desde la misma VM.

```bash
$ nginx -t -c /srv/taller-web/nginx.conf  # <1>
$ curl --silent --show-error --include http://127.0.0.1:8081/estado  # <2>
$ curl --silent --show-error --include --header 'Host: apache.localhost' http://127.0.0.1:8081/  # <3>
$ tail -n 1 /srv/taller-web/logs/nginx-access.log  # <4>
$ tail -n 1 /srv/taller-apache/logs/access.log  # <5>
```



1. Verifica la sintaxis de la copia de `nginx.conf` sin iniciar ni recargar Nginx.
2. Aporta una respuesta concreta del bloque directo de Nginx, limitada a loopback.
3. Aporta la respuesta de Apache atravesando Nginx; la marca de IX identifica el backend.
4. Registra el acceso en el frontal Nginx.
5. Correlaciona la misma solicitud con el registro del backend Apache.

## Evidencia y rollback
Entregue la salida satisfactoria de `nginx -t`, las dos respuestas HTTP saneadas y una línea de cada `nginx-access.log` y `access.log`. La evidencia debe mostrar `127.0.0.1`, el puerto local y la marca de contenido; no adjunte configuraciones ni registros de producción.

### Rollback
Retire los dos bloques de práctica de la copia de `nginx.conf`, restaure la configuración previa y deje de usar los puertos 8080/8081 para el taller. No inicie, recargue, reinicie ni detenga servicios desde este procedimiento: el responsable del entorno valida el rollback y aplica el mecanismo local autorizado.

## Entregables

:::{.callout-note}
TLS complementario usa únicamente un certificado local de laboratorio.
:::

```text
host=localhost
```
`comparacion-web.md`, configuración local y evidencia de la respuesta HTTP o HTTPS de prueba.

## Criterios de verificación observables
- Todo acceso se limita a localhost.
- La comparación distingue servidor web, proxy y TLS complementario.
- No hay emisión ni exposición pública.
