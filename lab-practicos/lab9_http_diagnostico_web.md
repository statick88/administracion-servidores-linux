# Laboratorio 6: HTTP Basico y Diagnostico Web

**Unidad:** 8 - Introducción a Servidores Web  
**Duración Estimada:** 60-90 minutos  
**Dificultad:** Principiante-Intermedio

## Objetivos

- Entender request/response con `curl`
- Validar DNS, puertos y headers
- Distinguir fallas tipicas: DNS vs puerto vs firewall vs servicio caido

## Requisitos Previos

- VM Ubuntu Server LTS (22.04 o 24.04) con acceso SSH
- Usuario con permisos sudo

## Pasos del Laboratorio

### Paso 1: Preparar un servicio HTTP de prueba (15 min)

```bash
$ python3 -m http.server 8080 --bind 0.0.0.0  # <1>
Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...
# <1>
```



1. **python3 -m http.server** levanta un servidor HTTP simple para pruebas.

En otra terminal SSH (o en la misma usando Ctrl+C luego), continua con las validaciones.

---

### Paso 2: Validar puerto y proceso (15 min)

```bash
$ sudo ss -lntp | grep ':8080'  # <1>
LISTEN 0 5 0.0.0.0:8080 0.0.0.0:* users:("python3",pid=1234,fd=3)
# <1>

$ curl -i http://127.0.0.1:8080/ | head -n 20  # <2>
HTTP/1.0 200 OK
Server: SimpleHTTP/0.6 Python/3.12.3
Content-type: text/html; charset=utf-8
...
# <2>
```



1. **ss -lntp** evidencia que el puerto esta escuchando y quien lo usa.
2. **curl -i** muestra status line y headers para validar HTTP.

---

### Paso 3: DNS vs IP (15 min)

```bash
$ getent hosts example.com  # <1>
2606:2800:220:1:248:1893:25c8:1946 example.com
# <1>

$ dig +short example.com | head -n 5  # <2>
93.184.216.34
# <2>
```



1. **getent hosts** valida resolucion usando el resolver del sistema.
2. **dig +short** muestra IPs resueltas de forma clara.

---

### Paso 4: Simulacion de fallas (15-30 min)

#### Falla A: servicio caido

Deten el server (Ctrl+C) y prueba:

```bash
$ curl -i http://127.0.0.1:8080/  # <1>
curl: (7) Failed to connect to 127.0.0.1 port 8080: Connection refused
# <1>
```



1. **Connection refused** suele indicar que no hay proceso escuchando en ese puerto.

#### Falla B: puerto bloqueado (si tienes UFW activo)

```bash
$ sudo ufw status verbose  # <1>
Status: active
# <1>

$ sudo ufw deny 8080/tcp  # <2>
# <2>

$ sudo ufw status numbered  # <3>
# <3>
```



1. **ufw status** confirma si el firewall esta activo.
2. **ufw deny** simula bloqueo.
3. **ufw status numbered** permite revertir con delete.

## Entregables (Evidencia)

- `ss -lntp | grep :8080`
- `curl -i http://127.0.0.1:8080/`
- `getent hosts example.com` y `dig +short example.com`
- Explicacion breve: diferencia entre `Connection refused` y un timeout

## Checklist de aceptación

- [ ] Levanté un servicio HTTP de prueba y evidencié el puerto en escucha con `ss -lntp | grep ':8080'`
- [ ] Incluí evidencia de respuesta HTTP con `curl -i http://127.0.0.1:8080/`
- [ ] Incluí evidencia de resolución DNS (`getent hosts` y `dig +short`)
- [ ] Expliqué con mis palabras `Connection refused` vs timeout
- [ ] Si cambié reglas de UFW para la simulación, las revertí y dejé UFW en estado consistente
