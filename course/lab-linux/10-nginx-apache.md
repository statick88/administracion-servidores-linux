# Práctica X — Nginx como proxy inverso hacia Apache

## Introducción

**Objetivo:** encadenar Nginx con el Apache de IX dentro de una VM aislada y desechable. Nginx escucha solo `127.0.0.1:8081` y reenvía solo a `127.0.0.1:8080`.

::: {.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

No uses IP, dominios o HTTP externos, adaptador puente, puertos publicados, `/etc/nginx` ni `systemctl`.

**Lo que podría salir mal:** el proxy puede publicar tráfico o reemplazar un servicio administrado.

**Cómo prevenirlo:**
1. Mantén ambos extremos en loopback y usa configuraciones bajo tu directorio.
2. Inicia Apache y Nginx manualmente; ciérralos en orden inverso.
:::

## Preparación

Completa [Apache IX](lab-linux/09-apache.md), verifica que su PID ya está detenido y conserva su `apache.conf`. Instala Nginx solo en la VM si falta, por el mecanismo aprobado por el docente.

```bash
export PROXY="$HOME/lab-web-x"  # <1>
mkdir -p "$PROXY"/{logs,run}  # <2>
printf 'práctica X: TU_NOMBRE\n' > "$PROXY/nota.txt"  # <3>
```



1. Define el directorio independiente de Nginx.
2. Crea registros y PID locales.
3. Inicia la nota de entrega; añade luego qué significa `upstream=200`.

## Configuración

Guarda `nginx.conf`, sustituyendo `TU_USUARIO` e identidad:

```nginx
worker_processes 1;
pid /home/TU_USUARIO/lab-web-x/run/nginx.pid;
events { worker_connections 64; }
http {
  log_format estudiante '$remote_addr $status "$request" upstream=$upstream_status';
  access_log /home/TU_USUARIO/lab-web-x/logs/access.log estudiante;
  error_log /home/TU_USUARIO/lab-web-x/logs/error.log info;
  server {
    listen 127.0.0.1:8081;
    server_name nginx-x.local;
    location / {
      proxy_pass http://127.0.0.1:8080;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      add_header X-Lab-Proxy "TU_NOMBRE";
    }
  }
}
```

## Validación, evidencia y rollback

No dejes un Apache IX previo activo. Valida ambos archivos; después inicia Apache, luego Nginx, y realiza una única solicitud local.

```bash
nginx -t -c "$PROXY/nginx.conf" | tee "$PROXY/nginx-sintaxis.txt"  # <1>
apachectl -t -f "$HOME/lab-web-ix/apache.conf" | tee "$PROXY/apache-sintaxis.txt"  # <2>
apache2 -f "$HOME/lab-web-ix/apache.conf" -DFOREGROUND & APACHE_PID=$!; printf '%s\n' "$APACHE_PID" > "$PROXY/run/apache.pid"  # <3>
nginx -c "$PROXY/nginx.conf" -g 'daemon off;' & NGINX_PID=$!; printf '%s\n' "$NGINX_PID" > "$PROXY/run/nginx.pid"  # <4>
sleep 1; curl --noproxy '*' -i http://127.0.0.1:8081/ | tee "$PROXY/respuesta-proxy.txt"  # <5>
tail -n 1 "$PROXY/logs/access.log" | tee "$PROXY/nginx-acceso.txt"  # <6>
tail -n 1 "$HOME/lab-web-ix/logs/access.log" | tee "$PROXY/apache-acceso.txt"  # <7>
case "$NGINX_PID:$APACHE_PID" in (*[!0-9:]*|:) exit 1;; esac; kill "$NGINX_PID"; wait "$NGINX_PID" 2>/dev/null || true; kill "$APACHE_PID"; wait "$APACHE_PID" 2>/dev/null || true  # <8>
```



1. Valida Nginx sin iniciar una escucha.
2. Revalida el Apache reutilizado.
3. Inicia el upstream manual de IX, guardando solo su PID propio.
4. Inicia el proxy manual después del upstream.
5. Demuestra la cadena mediante loopback.
6. Conserva el acceso de Nginx, donde `upstream=200` significa respuesta exitosa del upstream.
7. Conserva el acceso correlacionable de Apache.
8. Detén Nginx antes de Apache; no toques servicios administrados.

Entrega ambas configuraciones, las dos validaciones, respuesta, ambos accesos y `nota.txt`. Deben evidenciar `200`, HTML de IX, `X-Lab-Proxy`, `upstream=200` y la misma ruta en ambos logs.

## Rúbrica

| Evidencia | Puntos |
|---|---:|
| Escucha solo loopback | 2 |
| Proxy local y cabeceras | 2 |
| Dos validaciones sintácticas | 2 |
| Petición Nginx → Apache | 2 |
| Logs y cierre ordenado | 2 |

## Referencias

Fuente opcional: [revisión publicada](https://raw.githubusercontent.com/statick88/lab-linux/74eb8c9841bdccc58c03d050ad33aec897334330/docs/practicas/10-nginx-apache.md).