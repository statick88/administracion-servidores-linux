# 🚀 PLAN DE CREACIÓN DE CONTENIDOS
## Administración de Servidores Linux

**Versión:** 1.0  
**Fecha:** 29 de Enero de 2026  
**Objetivo:** Crear contenido teórico faltante (38 archivos)

---

## 📋 RESUMEN EJECUTIVO

| Aspecto | Número |
|---------|--------|
| **Archivos existentes** | 4 |
| **Archivos faltantes** | 38 |
| **Completitud actual** | 9.5% |
| **Tiempo estimado (Opción Equilibrada)** | 37-47 horas |
| **Recomendación** | Crear en 4 fases (2-3 semanas) |

---

## 🎯 OPCIÓN RECOMENDADA: EQUILIBRADA

**Crear:** 30 archivos = 95% cobertura  
**Tiempo:** ~37 horas  
**Duración:** 2-3 semanas (9h/semana)

### Distribución por Fase

```
FASE 1: CRÍTICO (Semana 1)
├─ Unidad 1: Introducción (4 archivos)    4.5h
└─ Unidad 2: Instalación (5 archivos)     7h
SUBTOTAL: 9 archivos | 11.5 horas

FASE 2: IMPORTANTE (Semana 2)
├─ Unidad 3: Comandos (5 archivos)        6h
├─ Unidad 4: Usuarios (5 archivos)        7.5h
└─ Ejercicios U3-U4 (2 archivos)          3h
SUBTOTAL: 12 archivos | 16.5 horas

FASE 3: COMPLEMENTARIO (Semana 3)
├─ Unidad 5: Procesos (5 archivos)        7.5h
├─ Unidad 6: Almacenamiento (5 archivos)  7.5h
└─ Ejercicio U5 (1 archivo)               1.5h
SUBTOTAL: 11 archivos | 16.5 horas

TOTAL: 32 archivos | 44.5 horas
```

---

## 📅 CRONOGRAMA DETALLADO

### FASE 1: CRÍTICO (Semana 1)

**Objetivo:** Tener base teórica para empezar enseñanza

#### Día 1: Unidad 1 (Introducción) - 4.5 horas

```
09:00-10:30  1_introduccion_sistemas_operativos.qmd
  ├─ Definición SO
  ├─ Componentes (kernel, shell, utilidades)
  ├─ Funciones básicas
  ├─ Ejemplos comparativos
  └─ Por qué existe Linux

10:30-11:00  break

11:00-12:15  2_historia_linux.qmd
  ├─ Historia Unix
  ├─ Nacimiento Linux (Linus Torvalds, 1991)
  ├─ Evolución de versiones
  ├─ Comunidad open-source
  └─ Linux hoy

12:15-13:00  Lunch

13:00-14:15  3_distribuciones_linux.qmd
  ├─ Concepto distribución
  ├─ Principales (Ubuntu, CentOS, Debian)
  ├─ Tabla comparativa
  ├─ Cuál elegir para qué
  └─ Abacom: Por qué Ubuntu 22.04 LTS

14:15-14:30  Break

14:30-15:30  4_ventajas_linux.qmd
  ├─ Código abierto
  ├─ Seguridad
  ├─ Estabilidad
  ├─ Costo
  ├─ Comunidad
  └─ Ventajas para Abacom
```

#### Día 2-3: Unidad 2 (Instalación) - 7 horas

```
Morning (3h):  1_requisitos_instalacion.qmd
  ├─ Hardware mínimo/recomendado
  ├─ BIOS/UEFI
  ├─ Particionamiento conceptos
  ├─ Checklist pre-instalación

Afternoon (2h): 2_instalacion_ubuntu.qmd (PASO A PASO)
  ├─ Descargar ISO
  ├─ Crear USB/DVD booteable
  ├─ Arrancar desde USB
  ├─ 6 pasos instalación con screenshots
  ├─ Troubleshooting común

Morning: 3_instalacion_centos.qmd (SIMILAR)
  └─ Diferencias con Ubuntu

Afternoon: 4_configuracion_inicial.qmd
  ├─ Configuración red (IP fija/DHCP)
  ├─ Hostname
  ├─ Crear usuarios
  ├─ SSH basics
  └─ Primeros comandos

Final: 5_actualizacion_sistema.qmd
  ├─ apt update/upgrade
  ├─ yum update (CentOS)
  ├─ Kernel updates
  └─ Security patches
```

**Entregable Fase 1:** 9 archivos listos para enseñanza

---

### FASE 2: IMPORTANTE (Semana 2)

**Objetivo:** Cobertura de Unidades 3-4 + ejercicios

#### Unidad 3 (Comandos) - 6 horas

```
1_introduccion_terminal.qmd (1h)
  ├─ Qué es terminal/shell/bash
  ├─ Prompt, sintaxis básica
  ├─ man pages, help, whatis
  └─ Estructura comando

2_comandos_basicos.qmd (2h)
  ├─ ls (opciones, outputs)
  ├─ cd, pwd, mkdir
  ├─ touch, rm, cp, mv
  ├─ find, locate
  └─ Tabla referencia rápida

3_navegacion_directorios.qmd (1h)
  ├─ Rutas absolutas/relativas
  ├─ . y ..
  ├─ ~ (home)
  ├─ FHS (Filesystem Hierarchy Standard)
  └─ Árbol directorios Linux

4_manipulacion_archivos.qmd (2h)
  ├─ cat, less, more
  ├─ Editores: nano, vi, vim basics
  ├─ head, tail, wc
  ├─ sort, uniq
  └─ Manejo de archivos grandes

5_busqueda_filtros.qmd (1.5h)
  ├─ grep, egrep, fgrep
  ├─ find avanzado
  ├─ Pipes y redirección (|, >, >>)
  ├─ cut, awk, sed basics
  └─ Combinaciones poderosas
```

#### Unidad 4 (Usuarios) - 7.5 horas ✅ COMPLETADO

**Implementado como Unidad 13** (`unidades/unidad13/`):

```
1_usuarios_grupos.qmd (1.5h) ✅
  ├─ Conceptos UID, GID
  ├─ /etc/passwd structure
  ├─ /etc/shadow, /etc/group
  ├─ Root vs usuarios normales

2_permisos_chmod.qmd (2h) ✅
  ├─ rwx explicado (leído, escrito, ejecutado)
  ├─ Notación octal (755, 644, 777)
  ├─ chmod (formas de cambiar)
  ├─ chown, chgrp
  ├─ ls -l interpretación completa

3_sudo_administracion.qmd (1.5h) ✅
  ├─ Qué es sudo
  ├─ /etc/sudoers (visudo)
  ├─ Reglas sudo avanzadas
  ├─ Seguridad en escalación

4_lab_practico_usuarios.qmd ✅
  └─ Laboratorio práctico integrado
```

#### Ejercicios Unidades 3-4 (3 horas)

```
1_ejercicios_comandos_basicos.qmd (1.5h)
  ├─ 25 ejercicios progresivos
  ├─ Con soluciones
  ├─ Niveles: básico, intermedio, avanzado

2_ejercicios_permisos.qmd (1.5h)
  ├─ 20 ejercicios permisos
  ├─ Escenarios reales
  ├─ Troubleshooting
```

**Entregable Fase 2:** 12 archivos (21 totales)

---

### FASE 3: COMPLEMENTARIO (Semana 3)

**Objetivo:** Procesos, almacenamiento y primeros proyectos

#### Unidad 5 (Procesos) - 7.5 horas

```
1_conceptos_procesos.qmd (1.5h)
  ├─ PID, PPID, sesiones
  ├─ Estados de proceso
  ├─ Señales (SIGTERM, SIGKILL, etc)
  ├─ Prioridades (nice)

2_monitoreo_procesos.qmd (2h)
  ├─ ps (variantes)
  ├─ top, htop, atop
  ├─ lsof (qué archivos abre un proceso)
  ├─ watch (monitoreo en tiempo real)

3_gestion_procesos.qmd (1.5h)
  ├─ kill (señales)
  ├─ nice, renice (prioridades)
  ├─ bg, fg, jobs
  ├─ nohup, disown

4_servicios_systemd.qmd (2h)
  ├─ Qué es systemd
  ├─ systemctl (start, stop, restart)
  ├─ enable, disable, status
  ├─ Unit files básicos
  ├─ journalctl (logs)

5_tareas_programadas.qmd (1.5h)
  ├─ cron (crontab, sintaxis)
  ├─ at (tareas puntuales)
  ├─ anacron (máquinas que se apagan)
  ├─ Ejemplos prácticos
```

#### Unidad 6 (Almacenamiento) - 7.5 horas

```
1_sistemas_archivos.qmd (1.5h)
  ├─ Concepto FS
  ├─ ext4 (features)
  ├─ XFS (ventajas)
  ├─ btrfs (avanzado)
  ├─ Comparación

2_particiones_disco.qmd (1.5h)
  ├─ MBR vs GPT
  ├─ fdisk (manejo)
  ├─ parted (herramienta moderna)
  ├─ Particiones primarias/extendidas

3_montaje_desmontaje.qmd (1.5h)
  ├─ Concepto montaje
  ├─ mount command
  ├─ /etc/fstab (automático)
  ├─ umount (seguro)

4_gestion_espacio.qmd (1.5h)
  ├─ df (espacio disco)
  ├─ du (tamaño directorios)
  ├─ Quotas de usuario
  ├─ Limpieza segura

5_raid_lvm.qmd (2h)
  ├─ RAID 0, 1, 5, 6
  ├─ Cuándo usar qué
  ├─ LVM basics
  ├─ Snapshots
```

#### Ejercicio Unidad 5 (1.5 horas)

```
3_ejercicios_procesos.qmd
  ├─ 20 ejercicios procesos
  ├─ Monitoreo y gestión
  ├─ Systemd práctico
```

**Entregable Fase 3:** 11 archivos (32 totales)

---

## 📊 RESUMEN DE FASES

| Fase | Archivos | Horas | Semana | Estado |
|------|----------|-------|--------|--------|
| 1 (Crítico) | 9 | 11.5h | Semana 1 | Necesario |
| 2 (Importante) | 12 | 16.5h | Semana 2 | Necesario |
| 3 (Complementario) | 11 | 16.5h | Semana 3 | Importante |
| **Total (Opción Equilibrada)** | **32** | **44.5h** | **3 semanas** | ✅ |

---

## 📝 TEMPLATE DE ARCHIVO QMD

Para crear archivos rápido, usa este template:

```markdown
---
title: "[Número y Título]"
author: "Diego Saavedra"
date: today
format:
  html:
    toc: true
    number-sections: true
---

# [Número] [Título Unidad]: [Subtema]

## Objetivos de Aprendizaje

Al final de esta sección, podrás:
- Objetivo 1
- Objetivo 2
- Objetivo 3

## Introducción

Párrafo de contexto.

## Conceptos Clave

### Concepto 1
Explicación detallada...

**Por qué importa:** Relevancia práctica

**Ejemplos:**
```bash
$ comando ejemplo
output
```

## Casos de Uso Reales en Abacom

Cómo se aplica en la empresa...

## Mejores Prácticas

✅ Hacer esto...
❌ No hacer esto...

## Resumen

Recapitulación de conceptos clave

## Recursos Adicionales

- [Link oficial](url)
- [Documentación](url)

## Preguntas de Repaso

1. ¿Qué es...?
2. ¿Cuándo usarías...?
3. ¿Cómo...?
```

---

## 🛠️ HERRAMIENTAS ÚTILES

Para acelerar la creación:

### 1. Template Generator
```bash
#!/bin/bash
# Crear archivo de contenido

cat > "unidades/unidad$1/$2.qmd" << 'EOF'
---
title: "[Número y Título]"
---

# Título
EOF
```

### 2. Estructura de Carpetas
```
unidades/
├── unidad1/
│   ├── 1_introduccion_sistemas_operativos.qmd
│   ├── 2_historia_linux.qmd
│   ├── 3_distribuciones_linux.qmd
│   └── 4_ventajas_linux.qmd
├── unidad2/
├── ... etc
└── ejercicios/
    ├── 1_ejercicios_comandos_basicos.qmd
    ├── 2_ejercicios_permisos.qmd
    └── ... etc
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Antes de Empezar
- [ ] Crear estructura de directorios
- [ ] Copiar template en cada archivo
- [ ] Crear checklist por archivo

### Durante Creación
- [ ] Escribir título y objetivos
- [ ] Desarrollo de conceptos
- [ ] Ejemplos y comandos probados
- [ ] Casos de uso Abacom
- [ ] Resumen y preguntas

### Después de Crear
- [ ] Revisar markdown válido
- [ ] Probar que renderiza en Quarto
- [ ] Verificar enlaces internos
- [ ] Peer review (opcional)

---

## 🚀 PRÓXIMA ACCIÓN

### OPCIÓN 1: Hacerlo Tú Solo
1. Usa este plan
2. Sigue template
3. 30 minutos por archivo = 19 horas total
4. 2-3 semanas completas

### OPCIÓN 2: Delegación/Colaboración
1. Compartir plan con colegas
2. Dividir unidades
3. Revisar mutuamente
4. Acelerar proceso

### OPCIÓN 3: Soporte Externo
1. Usar IA/ChatGPT como borrador
2. Tú editas y validas
3. Más rápido que escribir desde cero
4. Mantiene calidad

---

## 📊 PRIORIDAD POR UTILIDAD

**DEBE TENER (Semanas 1-6):**
1. Unidad 1: Introducción
2. Unidad 2: Instalación
3. Unidad 3: Comandos
4. Unidad 4: Usuarios

**DEBERÍA TENER (Semanas 7-10):**
5. Unidad 5: Procesos
6. Unidad 6: Almacenamiento

**PUEDE ESPERAR (Semanas 11+):**
7. Unidad 7: Redes
8. Unidad 8: Servicios
9. Proyectos y Ejercicios

---

**CONCLUSIÓN:** Con este plan, en 2-3 semanas tienes 95% del contenido teórico. Recomiendo empezar HOY con Fase 1.

