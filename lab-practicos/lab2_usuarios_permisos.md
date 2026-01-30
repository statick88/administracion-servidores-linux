# Laboratorio 2: Gestión de Usuarios y Permisos

**Unidad:** 4 - Gestión de Usuarios y Permisos  
**Duración Estimada:** 120 minutos  
**Dificultad:** Intermedio

## Objetivos

- Crear y gestionar usuarios en Linux
- Entender el sistema de permisos (rwx)
- Trabajar con grupos
- Usar sudo para escalación de privilegios

## Requisitos Previos

- Ubuntu del Lab 1 corriendo
- Acceso SSH como "alumno"
- Permisos sudo

## Pasos del Laboratorio

### Paso 1: Crear Nuevos Usuarios (20 min)

```bash
# Desde terminal con sudo
sudo useradd -m -s /bin/bash carlos
sudo useradd -m -s /bin/bash maria
sudo useradd -m -s /bin/bash admin_abacom

# Verificar usuarios creados
cat /etc/passwd | grep -E "carlos|maria|admin"

# Ver ID de usuarios
id carlos
id maria
```

### Paso 2: Establecer Contraseñas (10 min)

```bash
# Cambiar contraseña para carlos
sudo passwd carlos
# Ingresa: Carlos@123

# Cambiar para maria
sudo passwd maria
# Ingresa: Maria@123

# Cambiar para admin
sudo passwd admin_abacom
# Ingresa: Admin@123
```

### Paso 3: Crear Grupos (15 min)

```bash
# Crear grupo para desarrolladores
sudo groupadd desarrolladores

# Crear grupo para administradores
sudo groupadd sys_admins

# Agregar usuarios a grupos
sudo usermod -aG desarrolladores carlos
sudo usermod -aG desarrolladores maria
sudo usermod -aG sys_admins admin_abacom

# Verificar pertenencia a grupos
groups carlos
groups maria
groups admin_abacom
```

### Paso 4: Entender Permisos Básicos (25 min)

```bash
# Crear archivos para demostración
cd /home/alumno
echo "Contenido importante" > archivo_publico.txt
echo "Datos privados" > archivo_privado.txt

# Ver permisos actuales
ls -la archivo_*

# Cambiar permisos
chmod 755 archivo_publico.txt   # rwxr-xr-x (lectura todos)
chmod 700 archivo_privado.txt   # rwx------ (solo propietario)

# Verificar cambios
ls -la archivo_*

# Probar lectura como otro usuario
sudo -u carlos cat /home/alumno/archivo_publico.txt  # Debería funcionar
sudo -u carlos cat /home/alumno/archivo_privado.txt  # Debería fallar
```

### Paso 5: Permisos Avanzados - Directorios (20 min)

```bash
# Crear directorios
mkdir /home/alumno/proyecto_publico
mkdir /home/alumno/proyecto_privado

# Agregar archivos
echo "Proyecto A" > /home/alumno/proyecto_publico/archivo1.txt
echo "Proyecto B" > /home/alumno/proyecto_privado/archivo2.txt

# Cambiar permisos
chmod 755 /home/alumno/proyecto_publico  # Otros pueden listar
chmod 700 /home/alumno/proyecto_privado  # Solo propietario

# Verificar acceso
sudo -u carlos ls /home/alumno/proyecto_publico/   # OK
sudo -u carlos ls /home/alumno/proyecto_privado/   # Permission denied
```

### Paso 6: Sudo y Escalación de Privilegios (20 min)

```bash
# Agregar usuario a sudoers
sudo usermod -aG sudo admin_abacom

# Ver entrada de sudoers
sudo visudo -c
# Ver regla para admin_abacom

# Probar sudo como admin_abacom
sudo -u admin_abacom sudo whoami   # Debería mostrar "root"

# Ver histórico de sudo
sudo journalctl -u sudo -n 10

# O más simple
sudo grep COMMAND /var/log/auth.log | tail -5
```

### Paso 7: Cambiar Propietario y Grupo (15 min)

```bash
# Cambiar propietario de archivo
sudo chown carlos /home/alumno/archivo_publico.txt

# Cambiar grupo de archivo
sudo chgrp desarrolladores /home/alumno/archivo_publico.txt

# Cambiar propietario y grupo simultáneamente
sudo chown admin_abacom:sys_admins /home/alumno/proyecto_publico

# Verificar cambios
ls -la /home/alumno/archivo_publico.txt
ls -ld /home/alumno/proyecto_publico
```

## Ejercicios de Práctica Independiente

### Ejercicio A: Estructura de Permisos (30 min)

1. Crea un directorio llamado `/home/alumno/abacom-data`
2. Crea 3 archivos dentro: `config.txt`, `logs.txt`, `backup.tar`
3. Asigna permisos:
   - `config.txt`: Solo propietario puede leer/escribir (600)
   - `logs.txt`: Propietario rwx, grupo rx, otros ninguno (750)
   - `backup.tar`: Todos pueden leer, solo propietario escribir (644)
4. Verifica con `ls -la` y explica cada línea
5. Prueba acceso como usuario "carlos"

### Ejercicio B: Gestión de Grupos (20 min)

1. Crea un grupo llamado "abacom-team"
2. Agrega 3 usuarios: carlos, maria, admin_abacom
3. Crea un directorio `/home/alumno/equipo`
4. Cambia propietario a "admin_abacom:abacom-team"
5. Asigna permisos 770 al directorio
6. Verifica que todos los miembros del grupo pueden acceder

## Validación

Demuestra al instructor:

- [ ] 3 usuarios creados con diferentes grupos
- [ ] Permisos básicos (rwx) entendidos y aplicados correctamente
- [ ] Ejercicio A completado correctamente
- [ ] Ejercicio B completado correctamente
- [ ] Puedes explicar diferencia entre permisos de usuario/grupo/otros

## Troubleshooting

| Problema | Solución |
|----------|----------|
| "Permission denied" al crear usuario | Usar `sudo` |
| Usuario no aparece en `passwd` | Esperar segundos, refrescar con `cat /etc/passwd` |
| No puedo ver como otro usuario | Usar `sudo -u usuario comando` |
| sudo pide contraseña cada vez | Normal si no estás en wheel/sudo |

## Conceptos Clave

**Permisos en Linux:**
- r (read): 4
- w (write): 2
- x (execute): 1
- rwx = 7, rw- = 6, r-x = 5, etc.

**Propietario: Usuario:Grupo = PERMISOS**
- `drwxr-xr-x  alumno  alumno  proyecto/`
- d = directorio
- rwx = propietario
- r-x = grupo
- r-x = otros

---

