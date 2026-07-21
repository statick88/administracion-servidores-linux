# Laboratorio 10: Troubleshooting Integrado (Checklist + Evidencias)

**Unidad:** 12 - Diagnóstico y Troubleshooting  
**Duración Estimada:** 120-180 minutos  
**Dificultad:** Intermedio-Avanzado

## Objetivos

- Aplicar un flujo reproducible de diagnostico
- Recolectar evidencia minima (contexto, logs, red, recursos)
- Resolver incidentes simulados sin cambios destructivos

## Requisitos Previos

- VM Ubuntu Server LTS (22.04 o 24.04) con acceso SSH
- Usuario con permisos sudo
- Haber completado al menos: Lab 0, Lab 1, Lab 4 y uno de (Lab 7/8/9)

## Escenario

Un usuario reporta: "La web no responde".

Tu objetivo es producir un reporte de diagnostico y dejar el servicio operativo.

## Checklist de Evidencias (obligatorio)

### Evidencia 1: Contexto

```bash
$ hostnamectl  # <1>
 Static hostname: srv01
 Operating System: Ubuntu 24.04.1 LTS
# <1>

$ uptime  # <2>
 12:55:03 up 1 day,  3:21,  1 user,  load average: 0.08, 0.11, 0.09
# <2>
```



1. **hostnamectl** entrega contexto de host/OS.
2. **uptime** entrega contexto de carga y uptime.

---

### Evidencia 2: Red y puertos

```bash
$ ip -br addr  # <1>
enp0s3  UP  192.168.56.10/24
# <1>

$ ip route | head -n 5  # <2>
default via 192.168.56.1 dev enp0s3
# <2>

$ sudo ss -lntp | head -n 30  # <3>
...
# <3>
```



1. **ip -br addr** evidencia IP.
2. **ip route** evidencia gateway.
3. **ss -lntp** evidencia puertos TCP en escucha.

---

### Evidencia 3: Estado de servicio web

Escoge 1 segun tu stack:

- Si usas Nginx:

```bash
$ systemctl status nginx --no-pager  # <1>
● nginx.service - A high performance web server and a reverse proxy server
     Active: active (running)
# <1>

$ sudo journalctl -u nginx --since "2 hours ago" --no-pager | tail -n 40  # <2>
... logs ...
# <2>
```



1. **systemctl status** muestra estado actual.
2. **journalctl -u** entrega evidencia de logs.

- Si usas Apache:

```bash
$ systemctl status apache2 --no-pager  # <1>
● apache2.service - The Apache HTTP Server
     Active: active (running)
# <1>

$ sudo tail -n 40 /var/log/apache2/error.log  # <2>
... logs ...
# <2>
```



1. **systemctl status** muestra estado actual.
2. **tail error.log** entrega evidencia de errores.

---

### Evidencia 4: Recursos

```bash
$ free -h  # <1>
               total        used        free      shared  buff/cache   available
Mem:           3.8Gi       1.1Gi       2.0Gi        52Mi       740Mi       2.5Gi
# <1>

$ df -h  # <2>
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        49G  5.4G   41G  12% /
# <2>
```



1. **free -h** evidencia memoria.
2. **df -h** evidencia espacio.

## Incidentes simulados (elige 2)

### Incidente A: Puerto incorrecto

1. Configura tu servicio para escuchar en un puerto distinto (ej: 8080) y prueba `curl` en 80/443.
2. Documenta el error y la causa con `ss -lntp`.
3. Corrige y valida.

### Incidente B: Firewall bloqueando

1. Agrega una regla UFW que bloquee el puerto del servicio.
2. Evidencia con `ufw status`.
3. Corrige y valida.

### Incidente C: DNS / Host header

1. Prueba el VirtualHost usando `curl -H 'Host: ...'`.
2. Explica diferencia entre DNS y Host header.
3. Valida el sitio correcto.

## Entregables

- Checklist completo con outputs
- Para cada incidente elegido:
  - Sintoma
  - Evidencia
  - Hipotesis
  - Fix
  - Validacion

## Checklist de aceptación

- [ ] Incluí contexto (hostnamectl + uptime) con explicación breve
- [ ] Incluí evidencia de red y puertos (`ip -br addr`, `ip route`, `ss -lntp`)
- [ ] Incluí evidencia de estado y logs del servicio web (nginx o apache)
- [ ] Elegí y resolví 2 incidentes simulados con evidencia antes/después
- [ ] El servicio queda operativo y lo validé con `curl` (o prueba equivalente)
