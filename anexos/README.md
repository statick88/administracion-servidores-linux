# 📚 Anexos - Mini-Cursos Prácticos

## Bienvenido a los Anexos

Los **anexos** son mini-cursos especializados que proporcionan **conocimiento profundo** sobre herramientas y sistemas específicos necesarios para la administración de servidores Linux en Abacom.

A diferencia de las unidades (que enseñan conceptos generales), los anexos son **100% prácticos** y se enfocan en:
- Dominar una herramienta específica
- Scripts listos para usar
- Casos reales de Abacom
- Referencia rápida para búsqueda

---

## 📖 Estructura de Anexos

### Anexo A: Bash Scripting - Mini-Curso Práctico
**🎯 Objetivo**: Automatizar tareas en Linux

**Temas**:
- Variables y tipos de datos
- Condicionales (if/else/elif/case)
- Loops (for, while)
- Funciones y modularización
- Manejo de argumentos
- Redirección y pipes
- Scripts profesionales listos para usar

**Cuándo usarlo**:
- Necesitas crear scripts de automatización
- Unidades requieren Bash (verás referencias aquí)
- Desarrollar tools personalizadas para Abacom

**Tiempo**: 2 horas

---

### Anexo B: Editores Vi y Nvim - Mini-Curso Práctico
**🎯 Objetivo**: Editar archivos de configuración en terminal

**Temas**:
- Los 3 modos de Vim (Normal, Insert, Command)
- Navegación y movimiento eficiente
- Edición básica (insertar, copiar, pegar, borrar)
- Búsqueda y reemplazo
- Guardar y salir
- Configuración de Vim
- **LazyVim**: Nvim moderno con plugins
- Instalar y usar plugins

**Cuándo usarlo**:
- Necesitas editar /etc/nginx/nginx.conf
- Editar archivos de configuración vía SSH
- Usar Nvim en tu máquina local para desarrollo
- Entender cómo instalar plugins

**Tiempo**: 90 minutos

---

### Anexo C: Gestores de Paquetes - Debian, CentOS, Arch
**🎯 Objetivo**: Instalar software en cualquier distribución

**Temas**:
- **Debian/Ubuntu**: `apt` y `apt-get`
- **CentOS/RHEL**: `yum` y `dnf`
- **Arch Linux**: `pacman` y AUR
- Instalar, actualizar, desinstalar paquetes
- Buscar paquetes disponibles
- Gestionar repositorios
- Resolver dependencias
- Automatizar actualizaciones

**Cuándo usarlo**:
- Necesitas instalar nginx, postgresql, nodejs
- Trabajar en diferentes distribuciones (Debian, CentOS, Arch)
- Crear scripts que funcionan en múltiples distros
- Gestionar repositorios personalizados

**Tiempo**: 90 minutos

---

### Anexo D: Herramientas de Monitoreo - top, htop, etc
**🎯 Objetivo**: Observar y diagnosticar problemas del servidor

**Herramientas**:
- **top**: Monitor de procesos clásico
- **htop**: Top mejorado con colores
- **free**: Información de RAM
- **df**: Espacio en disco
- **du**: Uso por carpeta
- **iostat**: I/O del disco
- **netstat/ss**: Conexiones de red
- **vmstat**: Estadísticas de memoria virtual

**Cuándo usarlo**:
- "El servidor está lento" - ¿Qué está pasando?
- Monitorear CPU, RAM, disco
- Encontrar procesos problemáticos
- Ver conexiones activas
- Crear alertas y dashboards

**Tiempo**: 60 minutos

---

### Anexo E: Búsqueda y Procesamiento de Texto
**🎯 Objetivo**: Buscar, filtrar y procesar archivos y texto

**Herramientas**:
- **grep**: Buscar texto en archivos
- **find**: Encontrar archivos por nombre, tamaño, fecha
- **sed**: Editar streams (buscar/reemplazar)
- **awk**: Procesar columnas de texto

**Cuándo usarlo**:
- Buscar "error" en logs enormes
- Encontrar archivos modificados en últimos 7 días
- Reemplazar configuración en lote
- Procesar CSV o archivos de texto
- Generar reportes de sistemas

**Tiempo**: 2 horas

---

## 🗺️ Mapa de Referencia por Tarea

### Si necesitas **instalar software**:
→ **Anexo C: Gestores de Paquetes**
```bash
sudo apt install nginx         # Debian/Ubuntu
sudo dnf install nginx         # CentOS/RHEL
sudo pacman -S nginx           # Arch
```

### Si necesitas **editar archivo de config**:
→ **Anexo B: Editores Vi y Nvim**
```vim
:q     " Salir
:w     " Guardar
:%s/viejo/nuevo/g  " Reemplazar
```

### Si necesitas **crear script de automatización**:
→ **Anexo A: Bash Scripting**
```bash
#!/bin/bash
for FILE in $(find /home -type f -name "*.txt")
do
  echo "Procesando: $FILE"
done
```

### Si necesitas **diagnosticar problemas**:
→ **Anexo D: Herramientas de Monitoreo**
```bash
top           # Ver procesos
free -h       # Ver RAM
df -h         # Ver discos
ss -tn        # Ver conexiones
```

### Si necesitas **procesar datos/logs**:
→ **Anexo E: Búsqueda y Procesamiento**
```bash
grep "error" /var/log/syslog      # Buscar
find / -name "*.log" -mtime +30   # Encontrar
sed 's/viejo/nuevo/g' archivo.txt # Reemplazar
awk '{print $1}' archivo.csv       # Procesar
```

---

## 🎓 Cómo Usar los Anexos

### Opción 1: Aprender Completo (Recomendado primero)
```
Leer Anexo A completo (2h) → Entender Bash
Leer Anexo B completo (1.5h) → Saber editar
Leer Anexo C completo (1.5h) → Instalar en cualquier distro
Leer Anexo D completo (1h) → Diagnosticar
Leer Anexo E completo (2h) → Procesar datos
────────────────────────────────────
TOTAL: 8 horas de aprendizaje profundo
```

### Opción 2: Consulta Rápida (Mientras trabajas)
```
¿Cómo reemplazo texto en archivo?
→ Buscar en Anexo E: "Reemplazar Texto (Substitución)"
→ Ver tabla rápida de sed

¿Cómo instalo postgresql en CentOS?
→ Buscar en Anexo C: "CentOS/RHEL: yum y dnf"
→ Ver ejemplo "Instalar Paquete"
```

### Opción 3: Profundizar en una Herramienta
```
Dominar grep:
1. Leer Anexo E: GREP - Buscar Texto en Archivos (20 min)
2. Ver ejemplos prácticos (10 min)
3. Ejecutar ejercicios en tu máquina (30 min)
```

---

## 📊 Tabla: Cuándo Usar Cada Anexo

| Situación | Anexo | Tiempo |
|-----------|-------|--------|
| Necesito instalar nginx | C | 5 min |
| Necesito editar nginx.conf | B | 10 min |
| Quiero crear script de backup | A | 30 min |
| El servidor está lento | D | 20 min |
| Necesito procesar log gigante | E | 30 min |
| Aprender todo profundamente | A→E | 8 horas |

---

## 🔗 Referencias Cruzadas desde Unidades

Cuando leas una **Unidad** y veas esto:

```markdown
Ver **Anexo A: Bash Scripting** para entender variables
```

Significa que ese anexo explica conceptos necesarios para esa unidad.

**Ejemplo real**:
- **Unidad 2** (Instalación) puede necesitar
  - Anexo C (instalación de paquetes)
  - Anexo E (buscar logs de instalación)

---

## 💡 Consejos para Aprender

### 1. Practica en Sandboxes
```bash
# Usa una máquina virtual para experimentar
# Aprender sed sin miedo de dañar archivos reales
sed -i.bak 's/viejo/nuevo/g' archivo.txt  # Con backup
```

### 2. Mira Recursos Externos
Cada anexo tiene links a documentación oficial. Úsalos.

### 3. Crea tus Propios Scripts
Después de leer, combina lo aprendido:
```bash
# Combina:
# - Bash (A): Variables, loops
# - Monitoreo (D): top
# - Búsqueda (E): grep
# = Script que busca procesos pesados
```

### 4. Domina una Herramienta a la Vez
No intentes aprender todo a la vez. Enfócate en una.

---

## 📝 Estructura de Cada Anexo

Todos los anexos siguen este patrón:

1. **Introducción** - Por qué es importante
2. **Conceptos** - Explicación teórica (mínima)
3. **Ejemplos Prácticos** - Casos reales de Abacom
4. **Comparativas** - Diferencias (Debian vs CentOS vs Arch)
5. **Errores Comunes** - Qué NO hacer
6. **Quiz** - Autoevaluación
7. **Práctica** - Ejercicios para hacer
8. **Recursos** - Links a documentación oficial

---

## ✅ Checklist: Dominaste el Anexo Cuando...

### Anexo A (Bash)
- [ ] Puedes escribir script con loops y condicionales
- [ ] Entiendes variables ($1, $@, $?)
- [ ] Sabes usar redirección (>, >>)
- [ ] Puedes crear funciones reutilizables

### Anexo B (Vi/Nvim)
- [ ] Puedes abrir, editar y guardar archivo en Vim
- [ ] Sabes buscar y reemplazar (:%s/viejo/nuevo/g)
- [ ] Entiendes los 3 modos
- [ ] Instalaste un plugin en LazyVim

### Anexo C (Package Managers)
- [ ] Instalar paquete en Debian, CentOS, Arch
- [ ] Sabes diferencias entre apt/dnf/pacman
- [ ] Puedes actualizar sistema en cualquier distro
- [ ] Entiendes qué son repositorios

### Anexo D (Monitoreo)
- [ ] Sabes usar top y htop
- [ ] Puedes ver RAM con free
- [ ] Encontraste proceso problemático
- [ ] Viste conexiones con ss

### Anexo E (Búsqueda/Procesamiento)
- [ ] Buscar "error" en logs con grep
- [ ] Encontrar archivos grandes con find
- [ ] Reemplazar texto con sed
- [ ] Procesar columnas con awk

---

## 🚀 Próximos Pasos

Después de dominar los anexos:

1. **Aplicar en Unidades**: Usa lo aprendido cuando estudies Unidades
2. **Crear Scripts Propios**: Automatiza tareas reales de Abacom
3. **Experimentar**: Combina herramientas para casos nuevos
4. **Enseñar a Otros**: La mejor forma de dominar es explicar

---

## 📞 Preguntas Frecuentes

**P: ¿Necesito aprender TODOS los anexos?**
R: No todos. Aprende Bash (A) definido. Otros según necesidad.

**P: ¿En qué orden?**
R: Recomendado: A → B → C → D → E

**P: ¿Puedo saltarme uno?**
R: Sí, pero perderás contexto. Los anexos se complementan.

**P: ¿Cuánto tiempo lleva dominar todo?**
R: 8-12 horas de aprendizaje activo + práctica.

---

## 📚 Archivos Incluidos

```
anexos/
├── README.md (este archivo)
├── Anexo_A_Bash_Scripting.qmd
├── Anexo_B_Editores_Vi_Nvim.qmd
├── Anexo_C_Package_Managers.qmd
├── Anexo_D_Herramientas_Monitoreo.qmd
└── Anexo_E_Grep_Find_Sed_Awk.qmd
```

---

## ✨ Bienvenido a los Anexos

**Recuerda**: Estos no son temas teóricos. Son herramientas reales que usarás TODOS LOS DÍAS como administrador Linux en Abacom.

**Objetivo**: Que después de estos anexos, te sientas cómodo en la terminal. 🖥️

¡Comienza con Anexo A! 🚀

---
