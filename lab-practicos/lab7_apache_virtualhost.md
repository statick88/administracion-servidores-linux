# Laboratorio 7: Apache - Sitio y VirtualHost

**Unidad:** 9 - Apache (Servidor Web)  
**Duración Estimada:** 90-120 minutos  
**Dificultad:** Intermedio

## Objetivos

- Instalar Apache y validar servicio
- Crear un VirtualHost
- Revisar logs (access/error)
- Publicar un sitio simple con evidencia

## Requisitos Previos

- VM Ubuntu Server LTS (22.04 o 24.04) con acceso SSH
- Usuario con permisos sudo

## Pasos del Laboratorio

### Paso 1: Instalacion y validacion (20 min)

```bash
$ sudo apt update  # <1>
# <1>

$ sudo apt install -y apache2  # <2>
# <2>

$ systemctl status apache2 --no-pager  # <3>
● apache2.service - The Apache HTTP Server
     Active: active (running)
# <3>

$ curl -I http://127.0.0.1/  # <4>
HTTP/1.1 200 OK
Server: Apache/2.4.
# <4>
```



1. **apt update** actualiza el indice de paquetes.
2. **apt install apache2** instala Apache.
3. **systemctl status** verifica que el servicio esta corriendo.
4. **curl -I** valida respuesta HTTP local.

---

### Paso 2: Crear contenido del sitio (10 min)

```bash
$ sudo mkdir -p /var/www/app.local/public  # <1>
# <1>

$ printf 'app.local ok\n' | sudo tee /var/www/app.local/public/index.html >/dev/null  # <2>
# <2>
```



1. **mkdir -p** crea la estructura del document root.
2. **tee** escribe una pagina simple para validar.

---

### Paso 3: VirtualHost (25 min)

```bash
$ sudo tee /etc/apache2/sites-available/app.local.conf >/dev/null <<'EOF'  # <1>
<VirtualHost *:80>
  ServerName app.local
  DocumentRoot /var/www/app.local/public

  ErrorLog ${APACHE_LOG_DIR}/app.local-error.log
  CustomLog ${APACHE_LOG_DIR}/app.local-access.log combined

  <Directory /var/www/app.local/public>
    Require all granted
  </Directory>
</VirtualHost>
EOF
# <1>

$ sudo a2ensite app.local.conf  # <2>
# <2>

$ sudo a2dissite 000-default.conf  # <3>
# <3>

$ sudo apache2ctl configtest  # <4>
Syntax OK
# <4>

$ sudo systemctl reload apache2  # <5>
# <5>
```



1. **tee + heredoc** crea el VirtualHost.
2. **a2ensite** habilita el sitio.
3. **a2dissite** deshabilita el default para evitar confusiones.
4. **apache2ctl configtest** valida sintaxis.
5. **systemctl reload** aplica cambios sin cortar conexiones.

---

### Paso 4: Prueba por Host header + logs (20 min)

```bash
$ curl -i -H 'Host: app.local' http://127.0.0.1/  # <1>
HTTP/1.1 200 OK
Server: Apache/2.4.

app.local ok
# <1>

$ sudo tail -n 5 /var/log/apache2/app.local-access.log  # <2>
127.0.0.1 - - [02/Feb/2026:01:12:12 +0000] "GET / HTTP/1.1" 200 12 "-" "curl/8.0.1"
# <2>

$ sudo tail -n 5 /var/log/apache2/app.local-error.log  # <3>
# <3>
```



1. **curl -H Host** fuerza el VirtualHost sin necesidad de DNS.
2. **tail access.log** entrega evidencia de requests.
3. **tail error.log** confirma que no hay errores.

## Entregables (Evidencia)

- `systemctl status apache2 --no-pager`
- `apache2ctl configtest`
- `curl -i -H 'Host: app.local' http://127.0.0.1/`
- Ultimas 5 lineas de access/error logs del vhost

## Checklist de aceptación

- [ ] Apache está activo (evidencia de `systemctl status apache2 --no-pager`)
- [ ] El VirtualHost está habilitado y `apache2ctl configtest` retorna `Syntax OK`
- [ ] `curl -i -H 'Host: app.local' http://127.0.0.1/` responde con el contenido esperado
- [ ] Incluí evidencia de access log y confirmé ausencia de errores relevantes en error log
- [ ] Si usé UFW, el puerto 80 está permitido (o expliqué cómo lo validé)
