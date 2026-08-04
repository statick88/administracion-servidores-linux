# 🛡️ Guía Práctica: Unidad IV — Administración y Seguridad de Usuarios
**Facilitador:** Ing. Diego Medardo Saavedra García | Abacom™
**Entorno de trabajo:** Ubuntu Server / Contenedor `lab-linux`

---

## 📍 1. Gestión de Usuarios, Grupos y Skeleton (`/etc/skel`)

### Crear usuario completo con entorno de trabajo
```bash
# Crear usuario con Home (-m), Shell bash (-s), Comentario (-c) y Grupo secundario (-G)
sudo useradd -m -s /bin/bash -c "Ana Lopez - Dev" -G docker analopez

# Asignar contraseña al usuario
sudo passwd analopez

```

### Personalizar la plantilla predeterminada (`/etc/skel`)

> *Todo lo que se modifique en `/etc/skel` aparecerá automáticamente en las nuevas cuentas.*

```bash
# Crear estructura SSH por defecto con permisos seguros
sudo mkdir -p /etc/skel/.ssh
sudo chmod 700 /etc/skel/.ssh
sudo touch /etc/skel/.ssh/authorized_keys
sudo chmod 600 /etc/skel/.ssh/authorized_keys

# Agregar alias predeterminados para nuevos usuarios
echo "alias ll='ls -lh --color=auto'" | sudo tee -a /etc/skel/.bashrc

```

### Modificación, bloqueo y auditoría de cuentas

```bash
# Ver información pública de la cuenta
grep analopez /etc/passwd

# Ver hash de contraseña y políticas (requiere root)
sudo grep analopez /etc/shadow

# Bloquear la cuenta (agrega un ! al hash en /etc/shadow)
sudo usermod -L analopez

# Desbloquear la cuenta
sudo usermod -U analopez

# Forzar al usuario a cambiar contraseña en su próximo inicio de sesión
sudo chage -d 0 analopez

```

---

## 📍 2. Hardening con PAM (Protección contra Fuerza Bruta)

### Configurar política de bloqueo por intentos fallidos (`pam_faillock`)

Edita el archivo de autenticación PAM:

```bash
sudo nano /etc/pam.d/common-auth

```

Agrega/Verifica las siguientes líneas para bloquear la cuenta tras 5 fallos durante 15 min (900 seg):

```text
auth required pam_faillock.so preauth silent deny=5 unlock_time=900 fail_interval=60
auth [success=1 default=ignore] pam_unix.so
auth [default=die] pam_faillock.so authfail deny=5 unlock_time=900 fail_interval=60
auth sufficient pam_faillock.so authsucc deny=5 unlock_time=900 fail_interval=60

```

### Comandos de auditoría para PAM

```bash
# Consultar el estado de bloqueos de un usuario
sudo faillock --user analopez

# Desbloquear manualmente a un usuario bloqueado por PAM
sudo faillock --user analopez --reset

```

---

## 📍 3. Elevación Controlada de Privilegios (`sudoers`)

### Crear regla modular para un rol/usuario

> ⚠️ **Regla de oro:** Edita siempre mediante `visudo` para validar la sintaxis.

```bash
# Crear un archivo de reglas específico dentro de /etc/sudoers.d/
sudo visudo -f /etc/sudoers.d/desarrolladores

```

Agrega la siguiente regla (permite a `analopez` reiniciar Nginx sin contraseña de root):

```text
# Alias de comandos
Cmnd_Alias RESTART_NGINX = /bin/systemctl restart nginx, /bin/systemctl reload nginx

# Permiso específico
analopez ALL=(ALL) NOPASSWD: RESTART_NGINX

```

### Validar permisos de sudo

```bash
# Probar sintaxis de todos los archivos sudoers
sudo visudo -c

# Verificar qué comandos tiene permitido ejecutar un usuario con sudo
sudo -l -U analopez

```

---

## 📍 4. Claves SSH (`ed25519`) y Hardening de Daemon SSH

### Paso A: Generar y copiar clave (En la Máquina Local)

```bash
# 1. Generar la clave con algoritmo ed25519
ssh-keygen -t ed25519 -C "analopez@abacom.ec" -f ~/.ssh/id_ed25519_lab

# 2. Copiar la clave pública al servidor remoto
ssh-copy-id -i ~/.ssh/id_ed25519_lab.pub analopez@192.168.100.3

```

### Paso B: Hardening del Servidor SSH

Crea el archivo de configuración endurecida:

```bash
sudo nano /etc/ssh/sshd_config.d/99-hardening.conf

```

Añade los parámetros de seguridad:

```text
# Deshabilitar autenticación por contraseña
PasswordAuthentication no

# Deshabilitar login directo de root
PermitRootLogin no

# Intentos máximos de autenticación
MaxAuthTries 3

# Permitir solo usuarios/grupos específicos
AllowGroups sudo docker

```

Validar y recargar el servicio:

```bash
# Probar si hay errores de sintaxis en sshd
sudo sshd -t

# Recargar la configuración sin cortar conexiones activas
sudo systemctl reload ssh

```

---

## 📍 5. Ejecución del Laboratorio en Docker (`lab-linux`)

```bash
# Actualizar el repositorio de practicas
git pull origin main

# Reiniciar contenedor
docker compose down && docker compose up -d

# Ingresar al entorno de retos
docker compose exec lab-linux bash

# Comandos interactivos dentro del contenedor:
menu      # Seleccionar la Opción 4 (Unidad IV)
jugar     # Modo interactivo guiado
retos     # Ver objetivos de la unidad
evaluar   # Validar aciertos y progreso

```
