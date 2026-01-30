# Guía del Instructor - Administración de Servidores Linux

**Instructor Principal:** Diego Saavedra  
**Empresa Beneficiaria:** Abacom  
**Versión:** 1.0  
**Última Actualización:** Enero 2026

---

## 1. Visión General del Curso

### Propósito
Este curso capacita a profesionales de TI de Abacom en la administración profesional de servidores Linux, desde conceptos fundamentales hasta operaciones complejas en producción.

### Público Objetivo
- Administradores de sistemas junior/senior
- DevOps engineers
- Especialistas en infraestructura
- Profesionales de soporte técnico
- Desarrolladores que gestionan servidores propios

### Resultados de Aprendizaje
Al completar el curso, los participantes podrán:
- Instalar y configurar distribuciones Linux en producción
- Administrar usuarios, permisos y seguridad
- Gestionar procesos, servicios y automatización
- Configurar redes, firewall y acceso remoto
- Desplegar servicios web empresariales
- Monitorizar sistemas y resolver problemas
- Diseñar soluciones de servidor integral

---

## 2. Estructura del Curso

### Duración
**Estimada: 40-50 horas de contacto directo + 80-100 horas de laboratorio**

### Formato
- **Sesiones Sincrónicas:** 2-3 sesiones por semana (2-3 horas cada una)
- **Laboratorios Prácticos:** Guiados en sesión + independientes asincrónico
- **Evaluaciones:** Continuas mediante rúbricas y proyectos

### Unidades del Curso

| Unidad | Tema | Horas | Semana |
|--------|------|-------|--------|
| 1 | Introducción a Sistemas Operativos y Linux | 4 | 1 |
| 2 | Instalación y Configuración | 6 | 2-3 |
| 3 | Comandos Básicos y Navegación | 6 | 3-4 |
| 4 | Gestión de Usuarios y Permisos | 6 | 5-6 |
| 5 | Procesos y Servicios | 6 | 6-7 |
| 6 | Almacenamiento y Sistemas de Archivos | 6 | 8-9 |
| 7 | Redes y Seguridad | 6 | 9-10 |
| 8 | Servicios Empresariales | 8 | 11-12 |
| Proyectos | Prácticos Integrados | 12 | 13+ |

---

## 3. Preparación para Cada Sesión

### Pre-Sesión (24 horas antes)
- [ ] Revisar los objetivos de la sesión
- [ ] Preparar máquinas virtuales o servidores de laboratorio
- [ ] Probar todos los comandos y ejemplos
- [ ] Preparar diapositivas o materiales visuales
- [ ] Revisar tiempo estimado vs. tiempo disponible

### Estructura de Sesión Recomendada (2.5 horas)
```
00:00-00:05  Introducción y recap
00:05-00:30  Concepto teórico (con ejemplos)
00:30-00:50  Demostración práctica en vivo
00:50-01:40  Laboratorio guiado con estudiantes
01:40-02:25  Laboratorio independiente + Q&A
02:25-02:30  Cierre, tareas y preview siguiente sesión
```

### Post-Sesión (después de sesión)
- [ ] Guardar registro de asistencia
- [ ] Documentar preguntas frecuentes
- [ ] Actualizar material si es necesario
- [ ] Preparar feedback para estudiantes con dificultades
- [ ] Ajustar próxima sesión si es necesario

---

## 4. Materiales Requeridos

### Software Necesario
- **Para Instructor:**
  - Máquina con Ubuntu/CentOS configurada
  - VirtualBox o Hyper-V (para demos)
  - SSH client, terminal
  - Navegador web
  - Software de videoconferencia

- **Para Estudiantes:**
  - Software de virtualización (VirtualBox gratuito)
  - Imágenes ISO: Ubuntu 22.04 LTS, CentOS 8+
  - SSH client
  - Terminal/PowerShell
  - Navegador web

### Recursos Disponibles
- Documentación: `Readme.md` y archivos `.qmd`
- Brochure: `Brochure_Administración_de_Servidores_Linux.pdf`
- Rúbricas: `lab-practicos/rubrica-evaluacion.qmd`
- Imágenes: carpeta `images/`

---

## 5. Estrategias de Enseñanza

### Metodología: Aprender Haciendo (Hands-on)

#### Demostración (Instructor)
- Mostrar en pantalla compartida
- Explicar cada paso
- Hacer preguntas a los estudiantes
- Mostrar errores comunes

#### Práctica Guiada
- Estudiantes hacen juntos lo que el instructor hace
- Pausas para que sigan el ritmo
- Ayuda rápida vía chat/audio

#### Práctica Independiente
- Estudiantes trabajan en ejercicios similares
- Disponibilidad para preguntas
- Revisar trabajo completado

#### Laboratorios Integrados
- Proyectos que abarcan múltiples conceptos
- Aumentan en complejidad
- Simulan escenarios reales de Abacom

### Técnicas Efectivas

**Para Mantener Engagement:**
- Hacer preguntas cada 5-10 minutos
- Pedir que levanten mano para participar
- Usar polls/encuestas
- Reconocer contribuciones

**Para Gestionar Dificultades:**
- Ofrecer ayuda 1-a-1 por chat privado
- Grabar sesiones para review
- Compartir recursos adicionales
- Crear grupos de estudio

**Para Evaluación:**
- Rúbricas claras antes de la tarea
- Feedback específico y oportuno
- Celebrar logros
- Proporcionar recursos de mejora

---

## 6. Gestión de Laboratorios

### Setup de Laboratorio

**Antes de cada sesión de lab:**
```bash
# Verificar máquinas virtuales
- Todas las VMs encienden correctamente
- Red está configurada (NAT o Bridge)
- Espacio en disco disponible
- Usuario de laboratorio con permisos correctos

# Verificar acceso
- SSH funciona desde máquina anfitriona
- Credenciales de estudiantes válidas
- Permisos de archivo/directorio correctos
```

### Estructura de Laboratorio Recomendada

```
lab-practicos/
├── unidad1/
│   ├── lab1_instalacion.md
│   ├── scripts/
│   │   └── setup.sh
│   └── soluciones/
│       └── solucion_lab1.md
├── unidad2/
│   ├── lab2_usuarios.md
│   ├── scripts/
│   └── soluciones/
├── rubrica-evaluacion.qmd
└── recursos/
    ├── VMs/
    │   ├── ubuntu-base.ova
    │   └── centos-base.ova
    └── scripts/
        ├── reset-lab.sh
        └── check-lab.sh
```

### Evaluación de Laboratorios

**Usar rúbrica en `lab-practicos/rubrica-evaluacion.qmd`**

Aspectos a evaluar:
- Completitud de tarea
- Exactitud técnica
- Documentación y explicación
- Creatividad/mejoras
- Tiempo de entrega

Calificación: Numérica (0-100) o por competencia

---

## 7. Manejo de Problemas Comunes

### Problema: Estudiante no puede conectar a VM
**Solución:**
1. Verificar red (adapter settings en VirtualBox)
2. Verificar IP con `ip a` en la VM
3. Intentar ping desde host
4. Revisar firewall del host
5. Reiniciar VM si es necesario

### Problema: Estudiante perdió progreso en laboratorio
**Solución:**
1. Proporcionar snapshots de VM guardados
2. Script `reset-lab.sh` para reiniciar lab
3. Documentar pasos en archivo log
4. Ofrecer tiempo adicional si es necesario

### Problema: Comando "no funciona" (error no especificado)
**Solución:**
1. Pedir que copie el error exacto
2. Verificar: sintaxis, permisos, estado del servicio
3. Usar `man` o `--help` para verificar sintaxis
4. Buscar mensaje de error en documentación
5. Probar en VM del instructor

### Problema: Estudiante muy avanzado/atrasado
**Solución Avanzado:**
- Ofrecer desafíos adicionales
- Pedir que ayude a otros
- Asignar lectura adicional

**Solución Atrasado:**
- Sesión de catch-up 1-a-1
- Recursos adicionales documentados
- Ajustar ritmo si es tendencia general

---

## 8. Recursos para Instructores

### Documentación
- **Oficial:** Linux man pages (builtin `man` command)
- **Referencias:** linuxcommand.org, ubuntu.com, centos.org
- **Troubleshooting:** logs en `/var/log/`, `dmesg`

### Ejemplos por Unidad

**Unidad 1:** Historia, filosofía, instalación
```bash
# Demo: Mostrar versión Linux
uname -a
cat /etc/os-release
lsb_release -a

# Demo: Estructura del filesystem
ls -la /
tree -L 1 -a /
```

**Unidad 3:** Comandos básicos
```bash
# Demo: Navegación y archivos
pwd
ls -la
cd /usr/bin && ls | head -20
find . -name "*.conf" -type f

# Demo: Búsqueda y filtrado
grep "root" /etc/passwd
find /etc -name "*.conf" -type f 2>/dev/null
```

**Unidad 4:** Usuarios y permisos
```bash
# Demo: Crear usuario
sudo useradd -m -s /bin/bash testuser
id testuser
groups testuser

# Demo: Permisos
chmod 755 archivo.txt
ls -la archivo.txt
sudo -u testuser cat archivo.txt
```

---

## 9. Comunicación con Estudiantes

### Canales Recomendados
- **Sesiones sincrónicas:** Zoom/Teams (grabadas)
- **Chat:** Slack o Teams (respuestas en <24h)
- **Email:** Para asuntos formales
- **Foro:** Para dudas técnicas compartidas

### Respuestas a Preguntas Frecuentes

**P: ¿Necesito conocimiento previo de Linux?**
R: No, el curso comienza desde conceptos fundamentales. Se recomienda familiaridad con sistemas operativos.

**P: ¿Puedo usar Windows/Mac en lugar de Linux?**
R: Recomendamos máquinas virtuales Linux. En Windows 11+, WSL2 es alternativa parcial. Mac puede usar VM o parallels.

**P: ¿Qué distribución debo aprender?**
R: El curso cubre Ubuntu (user-friendly) y CentOS (enterprise). Conceptos son similares en otras distros.

**P: ¿Necesito servidor real o virtual está bien?**
R: VMs son suficientes para aprendizaje. El curso usa VirtualBox (gratuito).

---

## 10. Evaluación y Calificación

### Sistema de Evaluación

| Componente | Peso | Criterios |
|-----------|------|-----------|
| Participación | 10% | Asistencia, preguntas, contribuciones |
| Laboratorios | 50% | Completitud, exactitud, documentación |
| Quices/Evaluaciones | 20% | Conceptos clave, comprensión |
| Proyecto Final | 20% | Servidor integrado, documentación |

### Rúbricas por Laboratorio

Ver `lab-practicos/rubrica-evaluacion.qmd`

Escala sugerida:
- **Excepcional (90-100):** Completo, correcto, bien documentado, con mejoras
- **Competente (80-89):** Completo, mayormente correcto, documentado
- **Satisfactorio (70-79):** Mayormente completo, algunos errores, documentación básica
- **Insuficiente (<70):** Incompleto, errores significativos, o no entregado

### Entrega de Calificaciones
- Dentro de 48h después de entrega
- Incluir feedback específico
- Indicar qué mejorar

---

## 11. Desarrollo Profesional Continuo

### Para Mejorar tu Enseñanza

- Leer reviews de estudiantes después de curso
- Identificar 3-5 áreas de mejora
- Implementar cambios en próxima cohorte
- Mantenerse actualizado con cambios en Linux/sistemas
- Conectar con comunidades Linux

### Recursos Recomendados
- Linux Academy / Linux Foundation
- Sitios oficiales: ubuntu.com, redhat.com
- Comunidades: Linux subreddits, forums
- Conferencias: OpenStack, LinuxCon, etc.

---

## 12. Checklist Pre-Curso

### 2 Semanas Antes
- [ ] Confirmar fecha, horario, formato con Abacom
- [ ] Verificar acceso a todos los recursos
- [ ] Probar herramientas de videoconferencia
- [ ] Preparar lista de participantes
- [ ] Crear grupo/foro de comunicación

### 1 Semana Antes
- [ ] Preparar máquinas virtuales de demostración
- [ ] Verificar material de estudiantes está disponible
- [ ] Crear calendario de sesiones
- [ ] Preparar sesión 1 completamente
- [ ] Enviar instrucciones setup a estudiantes

### Día Anterior
- [ ] Descansar bien
- [ ] Probar setup técnico (cámara, micrófono, pantalla compartida)
- [ ] Tener agua/café disponible
- [ ] Revisar notas de Unidad 1

### Día de Sesión 1
- [ ] Entrar 15 min temprano
- [ ] Verificar que estudiantes pueden conectar
- [ ] Hacer conexión de prueba
- [ ] ¡Bienvenida cálida!

---

## 13. Contacto y Soporte

**Instructor:** Diego Saavedra  
**Web:** https://statick88.github.io  
**Organización:** Abacom

Para preguntas sobre esta guía o mejoras sugeridas, contactar al instructor.

---

**Versión:** 1.0 | **Fecha:** Enero 2026 | **Estado:** En uso activo

