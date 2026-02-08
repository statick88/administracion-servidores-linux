# Laboratorio 8: Nginx - Reverse Proxy + TLS

**Unidad:** 10 - Nginx y SSL  
**Duración Estimada:** 120-150 minutos  
**Dificultad:** Intermedio

## Objetivos

- Configurar un server block en Nginx
- Hacer reverse proxy hacia un servicio local
- Habilitar HTTPS con certificado self-signed (o Certbot si tienes dominio)

## Requisitos Previos

- VM Ubuntu Server LTS (22.04 o 24.04) con acceso SSH
- Usuario con permisos sudo

:::{.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

Si habilitas UFW sin permitir tu puerto SSH, puedes perder acceso.

**Lo que podría salir mal:**
- Bloqueo de SSH remoto.

**Cómo prevenirlo:**
1. Verifica tu puerto SSH actual.
2. Agrega la regla de UFW para SSH antes de activar.
:::

## Pasos del Laboratorio

### Paso 1: Levantar un backend local (15 min)

```bash
$ python3 -m http.server 9000 --bind 127.0.0.1  # <1>
Serving HTTP on 127.0.0.1 port 9000 (http://127.0.0.1:9000/) ...
# <1>
```



1. **python3 -m http.server** simula un backend HTTP local (solo loopback).

---

### Paso 2: Instalar Nginx y configurar reverse proxy (35 min)

```bash
$ sudo apt update  # <1>
# <1>

$ sudo apt install -y nginx  # <2>
# <2>

$ sudo tee /etc/nginx/sites-available/rp.conf >/dev/null <<'EOF'  # <3>
server {
  listen 80;
  server_name rp.local;

  location / {
    proxy_pass http://127.0.0.1:9000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
EOF
# <3>

$ sudo ln -sf /etc/nginx/sites-available/rp.conf /etc/nginx/sites-enabled/rp.conf  # <4>
# <4>

$ sudo nginx -t  # <5>
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
# <5>

$ sudo systemctl reload nginx  # <6>
# <6>

$ curl -i -H 'Host: rp.local' http://127.0.0.1/ | head -n 10  # <7>
HTTP/1.1 200 OK
Server: nginx
...
# <7>
```



1. **apt update** actualiza el indice.
2. **apt install nginx** instala Nginx.
3. **tee** crea la configuracion del reverse proxy.
4. **ln -sf** habilita el sitio.
5. **nginx -t** valida sintaxis.
6. **systemctl reload** aplica cambios.
7. **curl -H Host** prueba el server block.

---

### Paso 3: TLS self-signed (35 min)

```bash
$ sudo mkdir -p /etc/nginx/tls  # <1>
# <1>

$ sudo openssl req -x509 -nodes -newkey rsa:2048 -days 365 \
  -keyout /etc/nginx/tls/rp.local.key \
  -out /etc/nginx/tls/rp.local.crt \
  -subj "/CN=rp.local"  # <2>
# <2>

$ sudo tee /etc/nginx/sites-available/rp-tls.conf >/dev/null <<'EOF'  # <3>
server {
  listen 443 ssl;
  server_name rp.local;

  ssl_certificate     /etc/nginx/tls/rp.local.crt;
  ssl_certificate_key /etc/nginx/tls/rp.local.key;

  location / {
    proxy_pass http://127.0.0.1:9000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
EOF
# <3>

$ sudo ln -sf /etc/nginx/sites-available/rp-tls.conf /etc/nginx/sites-enabled/rp-tls.conf  # <4>
# <4>

$ sudo nginx -t  # <5>
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
# <5>

$ sudo systemctl reload nginx  # <6>
# <6>

$ curl -k -I -H 'Host: rp.local' https://127.0.0.1/  # <7>
HTTP/2 200
server: nginx
# <7>
```



1. **mkdir -p** crea directorio para llaves/certs.
2. **openssl req -x509** genera certificado self-signed para pruebas.
3. **tee** crea server block TLS.
4. **ln -sf** habilita el sitio TLS.
5. **nginx -t** valida.
6. **reload** aplica.
7. **curl -k** prueba HTTPS ignorando confianza (self-signed).

---

### Paso 4 (opcional): Certbot si tienes dominio (20-40 min)

```bash
$ sudo apt install -y certbot python3-certbot-nginx  # <1>
# <1>

$ sudo certbot --nginx -d tu-dominio.com  # <2>
# <2>

$ sudo certbot renew --dry-run  # <3>
# <3>
```



1. **apt install certbot** instala Certbot.
2. **certbot --nginx** emite certificado y configura TLS real.
3. **certbot renew --dry-run** valida renovacion.

## Entregables (Evidencia)

- `nginx -t` y `systemctl status nginx --no-pager`
- `curl -i -H 'Host: rp.local' http://127.0.0.1/` (reverse proxy)
- `curl -k -I -H 'Host: rp.local' https://127.0.0.1/` (TLS self-signed)

## Checklist de aceptación

- [ ] Nginx está activo y `nginx -t` pasa sin errores
- [ ] El reverse proxy funciona (evidencia de `curl -i -H 'Host: rp.local' http://127.0.0.1/`)
- [ ] TLS self-signed funciona (evidencia de `curl -k -I -H 'Host: rp.local' https://127.0.0.1/`)
- [ ] Identifiqué el backend local y confirmé que solo escucha en 127.0.0.1:9000
- [ ] Si UFW está activo, dejé abiertos 80/443 y mantuve acceso SSH
