# 🐧 Administración de Servidores Linux

**Curso Especializado - Abacom**

**Instructor:** [Diego Saavedra](https://statick88.github.io) | **Versión:** 2.0 (Enero 2026)

---

## 🎯 ¿De qué trata este curso?

Este es un **curso práctico e intensivo** diseñado para que domines la administración profesional de servidores Linux en entornos empresariales. No es una introducción teórica - es un camino directo para que puedas:

- ✅ Instalar y configurar sistemas Linux desde cero
- ✅ Administrar usuarios, permisos y seguridad efectivamente
- ✅ Desplegar servicios web y aplicaciones empresariales
- ✅ Monitorizar y resolver problemas en producción
- ✅ Automatizar tareas complejas con scripts Bash
- ✅ Aplicar mejores prácticas de la industria

**Dirigido a:** Profesionales de TI que quieren especializarse en administración de sistemas y estar preparados para roles DevOps o infraestructura.

---

## 🎓 Objetivos de Aprendizaje

Al completar este curso, serás capaz de:

### Instalación y Configuración

- Instalar múltiples distribuciones Linux (Ubuntu, CentOS/RHEL) en diferentes escenarios
- Configurar el sistema operativo para producción desde el primer arranque
- Particionar discos y gestionar sistemas de archivos eficientemente

### Dominio de la Terminal

- Navegar y manipular archivos con soltura usando línea de comandos
- Escribir scripts Bash que automaticen tareas administrativas complejas
- Usar herramientas avanzadas (grep, sed, awk) para procesamiento de datos

### Seguridad y Acceso

- Gestionar usuarios, grupos y permisos con modelos de seguridad robustos
- Configurar SSH para acceso remoto seguro y autenticado
- Implementar firewall (UFW, iptables) para proteger servidores

### Servicios y Aplicaciones

- Desplegar y configurar servidores web (Apache, Nginx)
- Gestionar servicios del sistema (systemd, init)
- Configurar DNS, FTP y otros servicios empresariales

### Monitorización y Mantenimiento

- Monitorizar recursos del sistema en tiempo real
- Analizar logs para diagnosticar y resolver problemas
- Automatizar copias de seguridad y mantenimiento preventivo

### Administración Avanzada

- Gestionar procesos y tareas programadas (cron)
- Administrar almacenamiento RAID y LVM
- Implementar redes y conectividad entre servidores


---

## 💡 ¿Por qué este curso es diferente?

### Enfoque 100% Práctico

No hay "teoría por teoría". Cada concepto se enseña a través de **ejercicios hands-on** reales:
- Laboratorios progresivos que construyen sobre lo anterior
- Proyectos integradores que simulan problemas reales
- Ejercicios de troubleshooting para desarrollar intuición

### Basado en Experiencia Empresarial

Todos los ejemplos, ejercicios y casos de estudio provienen de **situaciones reales en Abacom**:
- Configuración de servidores en producción
- Problemas de rendimiento y seguridad reales
- Automatización de tareas administrativas cotidianas

### Metodología "Aprender Haciendo"

```
Concepto → Ejemplo Práctico → Laboratorio Guiado → Desafío Independiente
```

Cada lección sigue este ciclo. No memorizarás comandos - los entenderás y los usarás.

### Orientado a Empleabilidad

Al terminar, tendrás:
- **Portfolio:** Proyectos completos que demuestren tus habilidades
- **Competencias:** Las exactas que piden empresas para roles DevOps/SysAdmin
- **Confianza:** Experiencia real para enfrentar problemas de producción

---

## 📚 Estructura del Curso

El curso está organizado en **8 unidades temáticas** progresivas, acompañadas de **4 laboratorios prácticos** y un **proyecto integrador final**.

### Unidad 1: Fundamentos - Sistemas Operativos y Linux

**¿Qué aprenderás?** Los conceptos que TODO administrador debe conocer

- Qué es un sistema operativo y cómo funciona
- Historia y filosofía de Linux
- Distribuciones principales: Ubuntu, CentOS/RHEL, Debian
- Ventajas de Linux en entornos empresariales
- Comparación: Windows vs macOS vs Linux

**Ejemplo:** Entenderás por qué Linux domina los servidores empresariales (99% de supercomputadoras, 96% de servidores en la nube)

---

### Unidad 2: Instalación y Primeros Pasos

**¿Qué aprenderás?** Cómo tener un servidor Linux funcionando desde cero

- Requisitos de hardware para diferentes escenarios
- Instalación paso a paso de Ubuntu Server
- Instalación de CentOS/RHEL
- Configuración inicial del sistema
- Actualización segura del sistema operativo
- Acceso remoto y primeras conexiones SSH

**Laboratorio Incluido:** Instala Ubuntu Server en una máquina virtual y conéctate remotamente

---

### Unidad 3: Dominio de la Terminal

**¿Qué aprenderás?** La herramienta más importante del administrador Linux

- Navegación por directorios (pwd, cd, ls)
- Inspección y manipulación de archivos
- Búsqueda avanzada con find y grep
- Permisos y propiedad de archivos
- Automatización de tareas comunes

**Proyecto:** Crea un script que organice automáticamente logs por fecha y tamaño

---

### Unidad 4: Usuarios, Grupos y Seguridad

**¿Qué aprenderás?** Cómo controlar quién puede acceder a qué

- Creación y gestión de usuarios y grupos
- Sistema de permisos POSIX (rwx)
- Escalada de privilegios con sudo
- Políticas de contraseña y autenticación
- Auditoria y logs de acceso

**Caso Real:** Configura un servidor con 3 usuarios diferentes (admin, desarrollador, web) con permisos específicos

---

### Unidad 5: Procesos, Servicios y Tareas Programadas

**¿Qué aprenderás?** Cómo ejecutar y mantener aplicaciones en segundo plano

- Gestión de procesos (ps, top, kill)
- Servicios del sistema con systemd
- Tareas programadas con cron
- Monitorización de recursos
- Manejo de señales y parada segura

**Laboratorio:** Crea un servicio personalizado que ejecute scripts a horas específicas

---

### Unidad 6: Almacenamiento y Filesystems

**¿Qué aprenderás?** Cómo gestionar discos y particiones como un profesional

- Estructura de particiones y tablas de particiones (MBR, GPT)
- Sistemas de archivos (ext4, XFS, Btrfs)
- Monitoreo de espacio en disco
- Copias de seguridad (backup/restore)
- RAID y LVM (opcional avanzado)

**Proyecto:** Configura particiones para un servidor con requisitos específicos de almacenamiento

---

### Unidad 7: Redes y Seguridad en Servidores

**¿Qué aprenderás?** Cómo conectar servidores de forma segura

- Configuración de redes (IPv4, IPv6, DNS)
- SSH para acceso remoto seguro
- Firewall (UFW) y reglas de tráfico
- Servicios de red (HTTP, FTP, DNS)
- Seguridad en conexiones

**Proyecto:** Configura un servidor con firewall que solo permita conexiones SSH y HTTP desde IPs específicas

---

### Unidad 8: Servicios Empresariales

**¿Qué aprenderás?** Cómo desplegar aplicaciones reales

- Apache y Nginx (servidores web)
- Certificados SSL/TLS
- Monitorización con herramientas estándar
- Logs y análisis de eventos
- Mantenimiento en producción

**Proyecto:** Despliega un sitio web con Nginx, HTTPS y sistema de logs

---

## 🧪 Laboratorios Prácticos

Cada laboratorio es una sesión guiada de 2-3 horas donde aplicas lo aprendido:

### Lab 1: Instalación y Configuración Básica
Instala Ubuntu Server, configura red, usuarios y SSH

### Lab 2: Gestión de Usuarios y Permisos
Crea múltiples usuarios con permisos específicos y verifica seguridad

### Lab 3: Procesos, Servicios y Monitorización
Levanta servicios, monitoriza recursos y diagnostica problemas

### Lab 4: Redes y Seguridad Avanzada
Configura firewall, SSH con claves, y servicios seguros

---

## 🏆 Proyecto Final Integrador

**Objetivo:** Configurar un servidor empresarial COMPLETO que integre todos los conceptos

**Escenario:** Abacom necesita un servidor web seguro que:
- Ejecute aplicaciones web (Nginx)
- Maneje usuarios con permisos específicos
- Tenga firewall configurado
- Realice backups automáticos
- Sea monitorizado y auditable

**Duración:** 2-3 semanas

**Evaluación:** Rubrica con criterios claros (funcionalidad, seguridad, documentación, escalabilidad)

---

## 👥 ¿Para quién es este curso?

**Este curso es para ti si:**

✅ Trabajas en TI y quieres especializarte en administración de sistemas

✅ Quieres prepararte para roles DevOps o SysAdmin

✅ Necesitas administrar servidores en tu empresa

✅ Quieres entender cómo funciona la infraestructura en la nube

**Este curso NO es para ti si:**

❌ Solo quieres aprender conceptos teóricos sin práctica

❌ Esperas un diploma sin hacer ejercicios reales

❌ No tienes al menos 8-10 horas por semana disponibles

---

## 💻 Requisitos Técnicos

### Hardware Mínimo Recomendado

Para ejecutar máquinas virtuales Linux mientras sigues el curso:

| Aspecto | Mínimo | Recomendado |
|---------|---------|------------|
| **Procesador** | Dual-core con virtualización | 4+ cores con VT-x/AMD-V |
| **RAM** | 8 GB | 16 GB |
| **Almacenamiento** | 50 GB disponibles | 100+ GB SSD |
| **Red** | Conexión estable | Banda ancha 10 Mbps+ |

### Software Necesario

**Virtualización (elige uno):**
- VirtualBox (gratuito, recomendado para principiantes)
- VMware Workstation/Fusion
- Hyper-V (Windows Pro/Enterprise)

**Imágenes del Sistema Operativo:**
- Ubuntu Server 22.04 LTS (primaria)
- CentOS 8+ o Rocky Linux (alternativa)

**Herramientas:**
- Terminal/SSH client (incluido en Linux/macOS, PuTTY/Windows Terminal en Windows)
- Editor de texto (VS Code, Nano, Vi)
- Navegador web moderno

### Hardware Opcional (Recomendado)

Para una experiencia óptima sin limitaciones:
- SSD externo o segundo disco para máquinas virtuales
- Monitor dual
- Laptop dedicado o partición separada para Linux

---

## ⏱️ Dedicación Requerida

### En Sesiones Sincrónicas
- 3-4 horas por semana de videoconferencias
- Grupos pequeños para Q&A efectivo

### En Laboratorios Independientes
- **8-10 horas por semana** fuera de sesiones
- Esto es CRÍTICO para consolidar competencias
- Incluye: práctica de comandos, resolución de problemas, lecturas

### Cronograma Estimado
```
Semanas 1-2:   Fundamentos + Instalación (20-25 horas total)
Semanas 3-4:   Terminal y Archivos (25-30 horas)
Semanas 5-6:   Usuarios y Seguridad (25-30 horas)
Semanas 7-8:   Servicios y Networking (30-35 horas)
Semanas 9-10:  Proyecto Final (40-50 horas)
```

**Total:** 150-170 horas (incluyendo evaluaciones y proyecto)

---

## 🎯 Conocimientos Previos

**Absolutamente Necesario:**
- Usar Windows, macOS o Linux en nivel usuario (instalar programas, navegar archivos)
- Conceptos básicos de redes (IP, puertos, HTTP)
- Confianza para explorar y experimentar sin miedo a "romper" cosas

**NO es necesario:**
- Experiencia previa en Linux (¡para eso está el curso!)
- Programación avanzada (Bash es fácil de aprender)
- Certificaciones previas

**Recomendado Antes de Empezar:**
- Familiaridad básica con Terminal/PowerShell
- Lectura del documento [SETUP.md](./SETUP.md) para preparar tu ambiente

---

## 📖 Cómo usar este curso

### Estructura del Material

```
Cada Unidad Contiene:
├── Conceptos Teóricos (explicación clara)
├── Ejemplos Prácticos (código real que funciona)
├── Ejercicios Progresivos (fácil → difícil)
├── Laboratorio Guiado (paso a paso)
└── Desafío Independiente (prueba tus habilidades)
```

### Flujo de Aprendizaje Recomendado

1. **Lectura:** Lee la unidad completa SIN intentar ejecutar nada
2. **Entendimiento:** Relé los ejemplos y asegúrate de comprenderlos
3. **Práctica:** Ejecuta todos los comandos en tu máquina virtual
4. **Experimentación:** Modifica los ejemplos y prueba variaciones
5. **Laboratorio:** Completa el ejercicio guiado sin copiar-pegar
6. **Dominio:** Resuelve el desafío independiente por tu cuenta

### Recursos Disponibles

- 📚 Material escrito en Markdown (este)
- 🎥 Videos de laboratorios (enlaces en cada unidad)
- 🖥️ Scripts y configuraciones de ejemplo
- 💬 Foro de discusión para preguntas
- 📊 Rúbricas de evaluación claras

---

## ✅ Próximos Pasos

### Si RECIÉN COMIENZAS

1. Lee [SETUP.md](./SETUP.md) para preparar tu ambiente
2. Lee **Unidad 1** (30 minutos)
3. Instala VirtualBox y descarga Ubuntu ISO (30 minutos)
4. Comienza **Unidad 2** con tu máquina virtual lista

### Si YA TIENES EXPERIENCIA

1. Toma el quiz de auto-evaluación (en Unidad 1)
2. Salta a la unidad donde tengas dudas
3. Completa el Proyecto Final directamente (con supervisión)

### Para INSTRUCTORES

1. Usa el archivo [GUIA_INSTRUCTOR.md](./GUIA_INSTRUCTOR.md)
2. Revisa las rúbricas de evaluación
3. Prepara tu entorno para sesiones prácticas

---

## 📞 Soporte y Contacto

**Problemas Técnicos:**
- Virtualización no funciona → [Guía de VirtualBox](./docs/troubleshoot/virtualbox.md)
- Conexión SSH falló → [Debugging de SSH](./docs/troubleshoot/ssh.md)
- Linux no arranca → [Problemas de arranque](./docs/troubleshoot/boot.md)

**Preguntas sobre el Contenido:**
- Foro: #administracion-linux
- Email: instructores@abacom.com
- Office hours: Martes y jueves 18:00-19:00 UTC

**Reportar Errores en el Material:**
- GitHub Issues: [github.com/abacom/linux-course](https://github.com/abacom/linux-course)
- Formato: "Unidad X | Tema | Descripción del error"

---

## 📝 Versión y Actualizaciones

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 2.0 | Enero 2026 | Rediseño completo, Ubuntu 22.04, Nginx + Apache |
| 1.5 | Julio 2025 | Agregar Docker y contenedores |
| 1.0 | Enero 2024 | Versión inicial |

Último actualizado: **Enero 30, 2026**

---

> **Bienvenido al viaje para convertirte en un profesional competente en administración de servidores Linux.** 
> 
> No será fácil, pero será gratificante. Cada comando que ejecutes te acercará a dominar esta habilidad. 
> 
> Empecemos. 🚀