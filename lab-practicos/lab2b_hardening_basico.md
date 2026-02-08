# Laboratorio 2B: Hardening Basico Post-Instalacion

**Unidad:** 2 - Instalación y Configuración  
**Duración Estimada:** 90-120 minutos  
**Dificultad:** Intermedio

## Objetivos

- Actualizar el sistema de forma segura
- Configurar UFW sin perder acceso SSH
- Endurecer SSH (minimo viable)
- (Opcional) Instalar Fail2Ban
- (Opcional) Habilitar unattended-upgrades

## Requisitos Previos

- Lab 1 completado (Ubuntu Server LTS instalado)
- Acceso SSH funcional
- Usuario con permisos sudo

:::{.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

Vas a tocar firewall y SSH.

**Lo que podría salir mal:**
- Bloquear tu acceso remoto por SSH.

**Cómo prevenirlo:**
1. Mantén una sesión SSH abierta mientras pruebas cambios.
2. Permite el puerto SSH en UFW antes de habilitarlo.
3. Valida la sintaxis de sshd antes de reiniciar el servicio.
:::

## Pasos del Laboratorio

### Paso 1: Actualizar el sistema (20 min)

```bash
$ sudo apt update  # <1>
# <1>

$ sudo apt upgrade -y  # <2>
# <2>

$ sudo apt autoremove -y  # <3>
# <3>
```



1. **apt update** actualiza el indice de paquetes.
2. **apt upgrade** aplica actualizaciones.
3. **apt autoremove** limpia dependencias no usadas.

---

### Paso 2: UFW seguro (25-35 min)

Primero identifica el puerto SSH actual:

```bash
$ sudo ss -lntp | grep sshd  # <1>
LISTEN 0 128 0.0.0.0:22 0.0.0.0:* users:("sshd",pid=987,fd=3)
# <1>
```



1. **ss -lntp** evidencia el puerto donde escucha sshd.

Ahora configura UFW:

```bash
$ sudo ufw status verbose  # <1>
Status: inactive
# <1>

$ sudo ufw allow 22/tcp  # <2>
# <2>

$ sudo ufw allow 80/tcp  # <3>
# <3>

$ sudo ufw allow 443/tcp  # <4>
# <4>

$ sudo ufw enable  # <5>
# <5>

$ sudo ufw status verbose  # <6>
Status: active
# <6>
```



1. **ufw status** muestra estado actual.
2. **ufw allow 22/tcp** permite SSH antes de activar firewall.
3. **ufw allow 80/tcp** permite HTTP.
4. **ufw allow 443/tcp** permite HTTPS.
5. **ufw enable** activa el firewall.
6. **ufw status verbose** valida reglas activas.

---

### Paso 3: Endurecer SSH (25-35 min)

```bash
$ sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak  # <1>
# <1>

$ sudo sshd -t  # <2>
# <2>
```



1. **cp** crea backup antes de cambios.
2. **sshd -t** valida sintaxis (antes/despues).

Edita `/etc/ssh/sshd_config` y aplica minimo:

- `PermitRootLogin no`
- `PasswordAuthentication no` (solo si ya tienes claves)
- `MaxAuthTries 3`

Luego valida y recarga:

```bash
$ sudo sshd -t  # <1>
# <1>

$ sudo systemctl reload ssh  # <2>
# <2>
```



1. **sshd -t** evita recargar una config invalida.
2. **systemctl reload ssh** aplica cambios sin cortar sesiones activas.

---

### Paso 4 (opcional): Fail2Ban (20 min)

```bash
$ sudo apt install -y fail2ban  # <1>
# <1>

$ systemctl status fail2ban --no-pager  # <2>
● fail2ban.service - Fail2Ban Service
     Active: active (running)
# <2>
```



1. **apt install fail2ban** instala Fail2Ban.
2. **systemctl status** valida servicio.

---

### Paso 5 (opcional): Unattended upgrades (20 min)

```bash
$ sudo apt install -y unattended-upgrades  # <1>
# <1>

$ sudo systemctl status unattended-upgrades --no-pager  # <2>
# <2>
```



1. **apt install unattended-upgrades** instala actualizaciones automaticas.
2. **systemctl status** valida servicio.

## Entregables (Evidencia)

- `ufw status verbose` con reglas y estado active
- Evidencia del puerto SSH en escucha (`ss -lntp | grep sshd`)
- `sshd -t` sin errores
- (Opcional) `systemctl status fail2ban --no-pager`
- (Opcional) `systemctl status unattended-upgrades --no-pager`

## Checklist de aceptación

- [ ] Ejecuté `sudo apt update` y `sudo apt upgrade -y` (evidencia incluida)
- [ ] UFW quedó activo y permite SSH (evidencia de `ufw status verbose`)
- [ ] `sshd -t` retorna sin errores antes/después de cambios
- [ ] Puedo mantener acceso SSH después de aplicar los cambios
- [ ] (Opcional) Fail2Ban está activo (evidencia de `systemctl status fail2ban --no-pager`)
- [ ] (Opcional) unattended-upgrades está activo (evidencia de `systemctl status unattended-upgrades --no-pager`)
