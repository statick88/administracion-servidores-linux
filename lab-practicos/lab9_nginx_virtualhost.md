# Laboratorio 9: Nginx - Sitio y Virtual Host

**Unidad:** IX - Nginx (Servidor Web)  
**Duración Estimada:** 90-120 minutos  
**Dificultad:** Intermedio

## Introducción

En esta unidad reemplazamos Apache por **Nginx**, un servidor web de alto rendimiento basado en eventos. Trabajaremos dentro de **Ubuntu 24.04 en WSL2** (sin máquinas virtuales ni ISOs) y crearemos un *server block* (el equivalente de un VirtualHost) para servir un sitio `app.local`.

- Contexto: Nginx usa una configuración declarativa en `sites-available`/`sites-enabled`.
- Por qué es importante: dominar los server blocks te permite alojar múltiples sitios en un solo puerto 80/443.
- Qué aprenderás: instalar Nginx, crear un server block, validar la sintaxis y recargar el servicio.

## Objetivos

- Instalar Nginx y validar el servicio
- Crear un server block para `app.local`
- Revisar logs de acceso y error en `/var/log/nginx/`
- Publicar un sitio simple con evidencia

## Requisitos Previos

- Ubuntu 24.04 LTS en WSL2 con acceso a la shell
- Usuario con permisos sudo
- Docker Desktop operativo (heredado del Laboratorio 1)

## Pasos del Laboratorio

### Paso 1: Instalación y validación (20 min)

```bash
$ sudo apt update  # <1>
Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease
# <1>

$ sudo apt install -y nginx  # <2>
# <2>

$ systemctl status nginx --no-pager  # <3>
● nginx.service - A high performance web server
     Active: active (running)
# <3>

$ curl -I http://127.0.0.1/  # <4>
HTTP/1.1 200 OK
Server: nginx/1.24.0
# <4>
```

1. **apt update** actualiza el índice de paquetes.
2. **apt install nginx** instala el servidor web Nginx.
3. **systemctl status** verifica que el servicio está corriendo.
4. **curl -I** valida la respuesta HTTP local por defecto.

---

### Paso 2: Crear contenido del sitio (10 min)

```bash
$ sudo mkdir -p /var/www/app.local/public  # <1>
# <1>

$ printf 'app.local ok\n' | sudo tee /var/www/app.local/public/index.html >/dev/null  # <2>
# <2>
```

1. **mkdir -p** crea la estructura del document root.
2. **tee** escribe una página simple para validar.

---

### Paso 3: Server block en Nginx (25 min)

```bash
$ sudo tee /etc/nginx/sites-available/app.local >/dev/null <<'EOF'  # <1>
server {
    listen 80;
    server_name app.local;

    root /var/www/app.local/public;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    access_log /var/log/nginx/app.local-access.log;
    error_log  /var/log/nginx/app.local-error.log;
}
EOF
# <1>

$ sudo ln -s /etc/nginx/sites-available/app.local /etc/nginx/sites-enabled/app.local  # <2>
# <2>

$ sudo rm -f /etc/nginx/sites-enabled/default  # <3>
# <3>

$ sudo nginx -t  # <4>
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
# <4>

$ sudo systemctl reload nginx  # <5>
# <5>
```

1. **tee + heredoc** crea el server block con `root`, `index` y `location`.
2. **ln -s** habilita el sitio enlazándolo a `sites-enabled`.
3. **rm default** deshabilita el sitio por defecto para evitar conflictos de `server_name`.
4. **nginx -t** valida la sintaxis de la configuración.
5. **systemctl reload** aplica los cambios sin cortar conexiones activas.

:::{.callout-tip}
## 💡 RECOMENDACIÓN

Para un sitio que solo proxy a una app (por ejemplo un contenedor Docker en el puerto 3000), reemplaza el bloque `location` por:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

El `proxy_pass` delega las peticiones al backend; Nginx queda como reverse proxy.
:::

---

### Paso 4: Prueba por Host header + logs (20 min)

```bash
$ curl -i -H 'Host: app.local' http://127.0.0.1/  # <1>
HTTP/1.1 200 OK
Server: nginx/1.24.0

app.local ok
# <1>

$ sudo tail -n 5 /var/log/nginx/app.local-access.log  # <2>
127.0.0.1 - - [02/Feb/2026:01:12:12 +0000] "GET / HTTP/1.1" 200 12 "-" "curl/8.0.1"
# <2>

$ sudo tail -n 5 /var/log/nginx/app.local-error.log  # <3>
# <3>
```

1. **curl -H Host** fuerza el server block sin necesidad de DNS.
2. **tail access.log** entrega evidencia de los requests.
3. **tail error.log** confirma que no hay errores.

:::{.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

**No expongas Nginx a Internet sin necesidad ni sin firewall.**

**Lo que podría salir mal:**
- El puerto 80 queda abierto a toda tu red local o pública.
- Un server block mal configurado sirve contenido de otros sitios.

**Cómo prevenirlo:**
1. Mantén el sitio en `127.0.0.1` para pruebas locales dentro de WSL2.
2. Si usas UFW, permite solo el puerto 80 cuando sea estrictamente necesario.
3. Valida siempre con `sudo nginx -t` antes de recargar en producción.
:::

## Entregables (Evidencia)

- `systemctl status nginx --no-pager`
- `sudo nginx -t`
- `curl -i -H 'Host: app.local' http://127.0.0.1/`
- Últimas 5 líneas de access/error logs del server block

## Checklist de aceptación

- [ ] Nginx está activo (evidencia de `systemctl status nginx --no-pager`)
- [ ] El server block está habilitado y `sudo nginx -t` retorna sintaxis correcta
- [ ] `curl -i -H 'Host: app.local' http://127.0.0.1/` responde con el contenido esperado
- [ ] Incluí evidencia de access log y confirmé ausencia de errores en error log
- [ ] Si usé UFW, el puerto 80 está permitido (o expliqué cómo lo validé)

## Referencias

- Documentación Nginx: https://nginx.org/en/docs/
- Server blocks (Nginx): https://nginx.org/en/docs/http/server_names.html
