# Laboratorio 4B: Docker y Docker Compose

**Unidad:** 4 - Docker y Containerización  
**Duración Estimada:** 90-120 minutos  
**Dificultad:** Intermedio

## Objetivos

- Instalar Docker y validar motor
- Levantar un servicio con Docker Compose
- Revisar logs, puertos y volúmenes

## Requisitos Previos

- VM Ubuntu Server LTS (22.04 o 24.04) con acceso SSH
- Usuario con permisos sudo

## Pasos del Laboratorio

### Paso 1: Instalación (20-30 min)

```bash
$ sudo apt update  # <1>
# <1>

$ sudo apt install -y docker.io docker-compose-plugin  # <2>
# <2>

$ systemctl status docker --no-pager  # <3>
● docker.service - Docker Application Container Engine
     Active: active (running)
# <3>

$ sudo docker version  # <4>
# <4>
```



1. **apt update** actualiza indice.
2. **apt install docker.io** instala Docker y el plugin de Compose.
3. **systemctl status docker** valida servicio.
4. **docker version** valida el cliente/servidor.

---

### Paso 2: Compose - servicio web simple (30-40 min)

```bash
$ mkdir -p ~/lab4b && cd ~/lab4b  # <1>
# <1>

$ cat > compose.yml <<'EOF'  # <2>
services:
  web:
    image: nginx:1.25-alpine
    ports:
      - "8080:80"
EOF
# <2>

$ sudo docker compose up -d  # <3>
# <3>

$ sudo docker compose ps  # <4>
# <4>

$ curl -I http://127.0.0.1:8080/  # <5>
HTTP/1.1 200 OK
Server: nginx
# <5>
```



1. **mkdir/cd** crea un workspace del lab.
2. **compose.yml** define un contenedor Nginx expuesto en 8080.
3. **docker compose up -d** levanta el stack en background.
4. **docker compose ps** valida estado.
5. **curl -I** valida que responde.

---

### Paso 3: Logs, puertos y limpieza (20-30 min)

```bash
$ sudo docker compose logs --tail 50  # <1>
# <1>

$ sudo ss -lntp | grep ':8080'  # <2>
# <2>

$ sudo docker compose down  # <3>
# <3>
```



1. **docker compose logs** muestra evidencia de ejecucion.
2. **ss -lntp** evidencia que el puerto esta escuchando.
3. **docker compose down** detiene y elimina contenedores del stack.

## Entregables (Evidencia)

- `systemctl status docker --no-pager`
- `docker compose ps`
- `curl -I http://127.0.0.1:8080/`
- `docker compose logs --tail 50`

## Checklist de aceptación

- [ ] Docker está instalado y el daemon está activo (evidencia de `systemctl status docker --no-pager`)
- [ ] El stack levanta con `docker compose up -d` y aparece en `docker compose ps`
- [ ] `curl -I http://127.0.0.1:8080/` devuelve `200 OK`
- [ ] Incluí evidencia de logs (`docker compose logs --tail 50`)
- [ ] Bajé el stack con `docker compose down` y verifiqué que el puerto 8080 ya no escucha
