# ⚡ GUÍA RÁPIDA - Comienza Aquí

**Para:** Diego Saavedra  
**Proyecto:** Administración de Servidores Linux  
**Empresa:** Abacom

---

## 🚀 Empezar en 5 Minutos

### 1️⃣ Lee Esto Primero (2 min)
```
1. README.md              → Descripción general del curso
2. GUIA_INSTRUCTOR.md     → Cómo enseñar (CRÍTICO)
3. PROXIMOS_PASOS.md      → Preparación antes de clase
```

### 2️⃣ Los 4 Laboratorios (Navegar)
```
lab-practicos/
├── lab1_instalacion_ubuntu.md        ← Instalar Ubuntu
├── lab2_usuarios_permisos.md         ← Usuarios Linux
├── lab3_procesos_servicios.md        ← Procesos & systemd
└── lab4_redes_ssh.md                 ← Redes y SSH seguro
```

### 3️⃣ Evaluación
```
Checklist de aceptación al final de cada lab/práctica  ← Cómo calificar
```

---

## 📚 Estructura del Curso

**8 Unidades | 4 Laboratorios | 12+ Semanas**

```
Semana 1-3:   Fundamentos (Instalación)
Semana 4-7:   Usuarios & Procesos (2 Labs)
Semana 8-10:  Almacenamiento & Redes (1 Lab)
Semana 11-12: Servicios & Proyecto Final
```

---

## 🎯 Tu Rol Como Instructor

**Durante cada sesión (2.5 horas):**
1. Teoría (30 min) - Conceptos + ejemplos
2. Demostración (30 min) - Vivo en pantalla
3. Lab Guiado (50 min) - Estudiantes hacen conmigo
4. Lab Independiente (30 min) - Ellos solos, yo disponible
5. Cierre (10 min) - Resumen + tareas

**Ver:** GUIA_INSTRUCTOR.md sección 3

---

## 📋 Checklist: Antes de Clase 1

- [ ] VirtualBox instalado
- [ ] Ubuntu 22.04 ISO descargada
- [ ] VM de demostración funciona
- [ ] Zoom/Teams probado (audio, video, pantalla)
- [ ] Leído: GUIA_INSTRUCTOR.md
- [ ] Preparada: Presentación Unidad 1
- [ ] Compartida: Documentación con estudiantes

**Tiempo:** ~1 hora de setup

---

## 🔥 Los 4 Comandos Que Necesitas Saber

Antes de empezar, practica estos en tu VM:

```bash
# Lab 1: Instalar Ubuntu (básico)
lsb_release -a

# Lab 2: Usuarios (gestión)
sudo useradd -m -s /bin/bash testuser
sudo passwd testuser

# Lab 3: Procesos (monitoreo)
top
systemctl status ssh

# Lab 4: Redes (seguridad)
ssh usuario@ip
sudo ufw enable
```

---

## 💡 Errores Comunes del Instructor

**NO hacer:**
❌ Hablar muy rápido
❌ Usar comandos sin explicar
❌ Saltarse las pruebas técnicas
❌ Olvidar pedir feedback

**SÍ hacer:**
✅ Pausas cada 5-10 min para preguntas
✅ Repetir conceptos clave 2-3 veces
✅ Mostrar errores Y soluciones
✅ Celebrar pequeños logros

---

## 📞 Soporte Rápido

**Problema:** "¿Cómo inicio una sesión?"
- Ver: GUIA_INSTRUCTOR.md, Sección 3

**Problema:** "¿Cómo califico un laboratorio?"
- Ver: Checklist de aceptación al final de cada lab

**Problema:** "¿Qué hacen si X no funciona?"
- Ver: Troubleshooting en cada lab (final)

**Problema:** "¿Cómo comunico con Abacom?"
- Ver: PROXIMOS_PASOS.md, Comunicación

---

## 🎓 Competencias Finales del Estudiante

Después de completar el curso, podrán:

✅ Instalar Linux profesionalmente
✅ Administrar usuarios y seguridad
✅ Gestionar procesos y servicios
✅ Configurar redes y firewall
✅ Usar SSH de manera segura
✅ Automatizar tareas
✅ Diagnosticar problemas

---

## 📊 Evaluación Simplificada

**3 Criterios (100 puntos):**
- Teoría: 30 puntos (¿Entienden los conceptos?)
- Práctica: 50 puntos (¿Funcionan los labs?)
- Integración: 20 puntos (¿Lo aplican todo junto?)

**Escala:**
- 90-100 → Excepcional ⭐⭐⭐⭐⭐
- 80-89 → Bueno ⭐⭐⭐⭐
- 70-79 → Satisfactorio ⭐⭐⭐
- <70 → Necesita mejorar ⚠️

---

## 🌟 Próxima Acción

```
HOY:        Lee README.md + GUIA_INSTRUCTOR.md
MAÑANA:     Prepara la clase y prueba VM
PRÓXIMO L:  Primer contacto con estudiantes
```

---

## 📚 Links Útiles Dentro del Proyecto

| Archivo | Propósito |
|---------|----------|
| `README.md` | Descripción curso |
| `GUIA_INSTRUCTOR.md` | Cómo enseñar (CRÍTICO) |
| `PROXIMOS_PASOS.md` | Qué hacer ahora |
| `RESUMEN_CORRECCIONES.md` | Qué se corrigió |
| `lab-practicos/README.md` | Índice de labs |
| `about.qmd` | Tu biografía |

---

## ✨ ¡Estás Listo!

El proyecto está completamente preparado. Solo necesitas:

1. Leer la documentación
2. Practicar en tu VM
3. Comunicarte con Abacom
4. ¡Empezar el curso!

**Duración estimada:** 
- Lectura: 1 hora
- Práctica personal: 2-3 horas
- Setup técnico: 1 hora

**Total:** ~5 horas antes de la primera clase

---

**¡Mucho éxito en el curso! 🚀**

Diego, el proyecto está listo para producción. Tienes todo lo que necesitas para ser un instructor exitoso.
