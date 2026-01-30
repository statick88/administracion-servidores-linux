# Laboratorios Prácticos - Administración de Servidores Linux

**Curso:** Administración de Servidores Linux  
**Para:** Abacom  
**Instructor:** Diego Saavedra  

---

## 📚 Índice de Laboratorios

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
- **Unidad:** 4 - Gestión de Usuarios y Permisos
- **Duración:** 120 minutos
- **Dificultad:** Intermedio
- **Archivo:** `lab2_usuarios_permisos.md`
- **Objetivos:**
  - Crear y gestionar usuarios
  - Entender sistema de permisos
  - Trabajar con grupos
  - Usar sudo

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

---

## 📊 Evaluación

Ver `rubrica-evaluacion.qmd` para:
- Criterios de evaluación (teoría, práctica, integración)
- Matriz de puntuación
- Verificación por casos de uso
- Plantilla de calificación

---

## 🛠️ Recursos Adicionales por Laboratorio

### Para Todos los Labs
- Máquina virtual Ubuntu 22.04 LTS configurada
- Acceso SSH desde máquina host
- Terminal con bash/zsh
- Permisos sudo

### Lab 1
- VirtualBox o similar
- Imagen ISO Ubuntu 22.04 LTS
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
| 5-6 | Lab 2: Usuarios | Ejercicio Independiente |
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
- O plataforma de aprendizaje indicada por Abacom
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

