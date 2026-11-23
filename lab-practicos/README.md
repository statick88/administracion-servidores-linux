# Laboratorios Prácticos - Administración de Servidores Linux

**Curso:** Administración de Servidores Linux  
**Para:** Estudiantes y administradores de TI  
**Instructor:** Diego Saavedra  

---

## 📚 Índice de Laboratorios

### Laboratorio 0: Diagnóstico del Sistema
- **Unidad:** 1 - Introducción a Linux
- **Duración:** 45-60 minutos
- **Dificultad:** Principiante
- **Archivo:** `lab0_diagnostico_sistema.md`
- **Objetivos:**
  - Identificar distribución, kernel y recursos del sistema
  - Validar conectividad de red básica

### Laboratorio 1: Instalación de Ubuntu Server
- **Unidad:** 2 - Instalación y Configuración
- **Duración:** 90 minutos
- **Dificultad:** Principiante
- **Archivo:** `lab1_instalacion_ubuntu.md`
- **Objetivos:**
  - Instalar Ubuntu Server en VM
  - Configurar particiones
  - Validar acceso SSH

### Laboratorio 2: Gestión de Usuarios y Permisos
- **Unidad:** 3 - Comandos Básicos de Linux
- **Duración:** 120 minutos
- **Dificultad:** Intermedio
- **Archivo:** `lab2_usuarios_permisos.md`
- **Objetivos:**
  - Crear y gestionar usuarios
  - Entender sistema de permisos
  - Trabajar con grupos
  - Usar sudo

### Laboratorio 2B: Hardening Básico Post-Instalación
- **Unidad:** 2 - Instalación y Configuración
- **Duración:** 90-120 minutos
- **Dificultad:** Intermedio
- **Archivo:** `lab2b_hardening_basico.md`
- **Objetivos:**
  - Actualizar el sistema de forma segura
  - Configurar UFW sin perder acceso SSH
  - Endurecer SSH (sin cambios destructivos)
  - (Opcional) Fail2Ban y unattended-upgrades

### Laboratorio 3: Administración de Procesos
- **Unidad:** 5 - Procesos y Servicios
- **Duración:** 90 minutos
- **Dificultad:** Intermedio
- **Archivo:** `lab3_procesos_servicios.md`
- **Objetivos:**
  - Monitorear procesos
  - Gestionar servicios con systemd
  - Tareas programadas (cron)
  - Automatización

### Laboratorio 4: Redes y SSH
- **Unidad:** 7 - Redes y Seguridad
- **Duración:** 120 minutos
- **Dificultad:** Intermedio-Avanzado
- **Archivo:** `lab4_redes_ssh.md`
- **Objetivos:**
  - Configuración de redes
  - SSH seguro con claves
  - Firewall básico
  - Diagnóstico de red

### Laboratorio 4B: Docker y Docker Compose
- **Unidad:** 4 - Docker y Containerización
- **Duración:** 90-120 minutos
- **Dificultad:** Intermedio
- **Archivo:** `lab4b_docker_compose.md`
- **Objetivos:**
  - Instalar Docker y validar motor
  - Levantar un servicio con Docker Compose
  - Revisar logs, puertos y volúmenes

### Laboratorio 5: Almacenamiento (Particiones y Montajes)
- **Unidad:** 6 - Almacenamiento y Sistemas de Archivos
- **Duración:** 90-120 minutos
- **Dificultad:** Intermedio
- **Archivo:** `lab5_almacenamiento_montajes.md`
- **Objetivos:**
  - Inventariar discos/FS (lsblk/df)
  - Crear un disco de laboratorio (loop)
  - Crear filesystem, montar y persistir con fstab
  - Diagnosticar espacio con du

### Laboratorio 6: HTTP Básico y Diagnóstico Web
- **Unidad:** 8 - Introducción a Servidores Web
- **Duración:** 60-90 minutos
- **Dificultad:** Principiante-Intermedio
- **Archivo:** `lab6_http_diagnostico_web.md`
- **Objetivos:**
  - Entender request/response con curl
  - Validar DNS, puertos y headers
  - Identificar fallas típicas (DNS/puerto/firewall)

### Laboratorio 7: Apache - Sitio y VirtualHost
- **Unidad:** 9 - Apache
- **Duración:** 90-120 minutos
- **Dificultad:** Intermedio
- **Archivo:** `lab7_apache_virtualhost.md`
- **Objetivos:**
  - Instalar Apache y habilitar módulos básicos
  - Crear un VirtualHost y revisar logs
  - Publicar un sitio simple con evidencia

### Laboratorio 8: Nginx - Reverse Proxy + TLS (self-signed)
- **Unidad:** 10 - Nginx y SSL
- **Duración:** 120-150 minutos
- **Dificultad:** Intermedio
- **Archivo:** `lab8_nginx_reverseproxy_tls.md`
- **Objetivos:**
  - Configurar server block
  - Hacer reverse proxy hacia un servicio local
  - Habilitar HTTPS con certificado self-signed (o Certbot si tienes dominio)

### Laboratorio 9: MariaDB - Usuarios, Privilegios y Backup/Restore
- **Unidad:** 11 - MariaDB
- **Duración:** 120-150 minutos
- **Dificultad:** Intermedio
- **Archivo:** `lab9_mariadb_backup_restore.md`
- **Objetivos:**
  - Asegurar instalación básica
  - Crear DB/usuario con privilegios mínimos
  - Generar y validar backup/restore

### Laboratorio 10: Troubleshooting Integrado (Checklist + Evidencias)
- **Unidad:** 12 - Diagnóstico y Troubleshooting
- **Duración:** 120-180 minutos
- **Dificultad:** Intermedio-Avanzado
- **Archivo:** `lab10_troubleshooting_integrado.md`
- **Objetivos:**
  - Resolver incidentes simulados (servicio/puertos/DNS/espacio)
  - Entregar reporte reproducible con evidencias

### Laboratorio 11: Clawdbot (OpenClaw) + Telegram + Tailscale (Seguridad)
- **Unidad:** 4/7/12 - Docker, Redes y Seguridad, Troubleshooting
- **Duración:** 150-210 minutos
- **Dificultad:** Avanzado
- **Archivo:** `lab11_clawdbot_openclaw_telegram_tailscale.md`
- **Objetivos:**
  - Levantar OpenClaw en Docker sobre Ubuntu Server LTS
  - Conectar Telegram (BotFather) al gateway
  - Aplicar postura minima de seguridad (pairing, mention gating, allowlists)
  - Restringir administracion mediante Tailscale + UFW

---

## 📊 Evaluación

Cada laboratorio incluye un **Checklist de aceptación** al final. Ese checklist define los criterios mínimos para considerar el lab como completado.

---

## 🛠️ Recursos Adicionales por Laboratorio

### Para Todos los Labs
- Máquina virtual Ubuntu Server LTS configurada (22.04 o 24.04)
- Acceso SSH desde máquina host
- Terminal con bash/zsh
- Permisos sudo

### Lab 1
- VirtualBox o similar
- Imagen ISO Ubuntu Server LTS
- 20GB espacio en disco
- 2GB RAM disponible

### Lab 2
- Usuario con permisos sudo
- Acceso a archivos del sistema

### Lab 3
- Servicios básicos funcionando
- Permisos para crear archivos
- Acceso a logs del sistema

### Lab 4
- SSH configurado
- Firewall deshabilitado inicialmente
- Acceso a utilidades de red

### Lab 4B
- Docker instalado (o permisos sudo para instalar)
- Acceso a Internet para descargar imágenes

---

## 📝 Instrucciones para Estudiantes

### Antes de Comenzar
1. Prepara tu entorno (VM, conexión SSH)
2. Lee el archivo del laboratorio completo
3. Anota cualquier duda antes de empezar
4. Verifica que tienes los requisitos previos

### Durante el Laboratorio
1. Sigue los pasos en orden
2. Prueba cada comando antes de continuar
3. Toma notas de lo que aprendes
4. Pregunta si algo no está claro

### Después del Laboratorio
1. Completa los ejercicios de práctica
2. Documenta tu trabajo
3. Prepara una presentación si se requiere
4. Entrega antes de la fecha límite

---

## 📅 Cronograma Sugerido

| Semana | Laboratorio | Tipo |
|--------|-------------|------|
| 2-3 | Lab 1: Instalación | Práctica Guiada |
| 3-4 | Lab 2B: Hardening | Práctica Guiada |
| 5-6 | Lab 2: Usuarios | Ejercicio Independiente |
| 6 | Lab 4B: Docker | Práctica Guiada + Independiente |
| 6-7 | Lab 3: Procesos | Ejercicio Independiente |
| 9-10 | Lab 4: Redes | Práctica Guiada + Independiente |
| 12+ | Proyecto Final | Integración |

---

## 🔧 Troubleshooting Común

### Problema: No puedo conectar SSH
**Soluciones:**
1. Verificar que VM está corriendo
2. Verificar IP: `ip a` en la VM
3. Verificar SSH está activo: `sudo systemctl status ssh`
4. Verificar firewall: `sudo ufw status`
5. Usar `ssh -v usuario@ip` para debug

### Problema: Permisos "Permission Denied"
**Soluciones:**
1. Verificar permisos actuales: `ls -la archivo`
2. Usar `chmod` para cambiar permisos
3. Si necesitas sudo: `sudo comando`
4. Verificar propietario: `ls -l | head -1` muestra `drwx------+ alumno alumno`

### Problema: Comando no encontrado
**Soluciones:**
1. Verificar sintaxis exacta
2. Usar `which comando` para ver si está instalado
3. Usar `man comando` para ayuda
4. Si no está instalado: `sudo apt install paquete`

---

## ✅ Entrega de Laboratorios

### Qué Entregar
- Documento con pantallazos de pasos completados
- Respuestas a preguntas formuladas
- Ejercicios de práctica completados
- Reflexión sobre lo aprendido

### Cómo Entregar
- Email al instructor
- O plataforma de aprendizaje indicada por la empresa
- Nombra archivos: `NombreEstudiante_Lab#.pdf`

### Fecha Límite
- Se indicará para cada laboratorio
- Entrega tardía: -10% por día

---

## 🎯 Competencias Desarrolladas

### Después de Todos los Labs, podrás:
- ✅ Instalar y configurar servidores Linux
- ✅ Administrar usuarios y permisos
- ✅ Gestionar procesos y servicios
- ✅ Configurar redes y firewall
- ✅ Usar SSH de manera segura
- ✅ Automatizar tareas
- ✅ Diagnosticar problemas de sistema

---

**Para preguntas o problemas, contacta al instructor: Diego Saavedra**
