# Laboratorio 1: Instalación de Ubuntu Server

**Unidad:** 2 - Instalación y Configuración  
**Duración Estimada:** 90 minutos  
**Dificultad:** Principiante

## Objetivos

- Instalar Ubuntu Server 22.04 LTS en máquina virtual
- Configurar particiones de disco
- Realizar configuración inicial del sistema
- Validar acceso SSH

## Requisitos Previos

- VirtualBox instalado
- 20 GB de almacenamiento libre en host
- Imagen ISO de Ubuntu 22.04 LTS descargada
- Conexión de red activa

## Pasos del Laboratorio

### Paso 1: Crear Máquina Virtual (15 min)

1. Abre VirtualBox
2. Click en "Nueva"
3. Configura:
   - **Nombre:** Ubuntu-Lab-01
   - **Tipo:** Linux
   - **Versión:** Ubuntu (64-bit)
   - **RAM:** 2048 MB (mínimo)
   - **Disco:** 20 GB, dinámico
4. Haz click "Crear"

### Paso 2: Configurar Adaptador de Red (10 min)

1. Selecciona la VM y abre "Configuración"
2. Ir a "Red"
3. Asegúrate que "Adaptador 1" está en "NAT"
4. Click "Aceptar"

### Paso 3: Iniciar Instalación (20 min)

1. Inicia la VM
2. Selecciona la imagen ISO de Ubuntu 22.04
3. Selecciona "Try or Install Ubuntu"
4. Espera a que cargue

### Paso 4: Instalación del Sistema (40 min)

1. Selecciona idioma (Español)
2. Configuración de teclado (tu país)
3. Selecciona "Ubuntu Server"
4. Configuración de red:
   - Usa DHCP (automático)
5. Proxy: Dejar en blanco
6. Mirror: Usar default
7. Particionamiento:
   - Selecciona "Use An Entire Disk"
   - Selecciona el disco de 20GB
8. Crea usuario:
   - **Usuario:** alumno
   - **Contraseña:** Lab@2024 (cambiar en producción)
   - **Hostname:** ubuntu-lab-abacom
9. Selecciona "Install OpenSSH Server"
10. Espera a que complete (10-15 min)

### Paso 5: Primer Arranque (10 min)

1. Sistema arranca automáticamente
2. Verifica que muestra login prompt
3. Haz login con usuario "alumno"

### Paso 6: Verificar Conectividad SSH (15 min)

```bash
# Dentro de la VM
ip a  # Anota la IP asignada (ej: 192.168.1.X)
```

Desde tu computadora host:
```bash
ssh alumno@192.168.1.X
# Ingresa la contraseña: Lab@2024
# Si funciona, verás el prompt de ubuntu-lab-abacom
```

## Validación

Marca cuando completes cada punto:

- [ ] VM creada en VirtualBox
- [ ] Ubuntu instalado exitosamente
- [ ] Sistema arranca sin errores
- [ ] SSH conecta desde host
- [ ] Comando `uname -a` muestra Ubuntu 22.04

## Troubleshooting

| Problema | Solución |
|----------|----------|
| "No se puede conectar a la red" | Verificar adaptador de red en VirtualBox config |
| "ISO no se encuentra" | Verificar ruta de ISO en VirtualBox |
| "Pantalla negra después de boot" | Esperar 2-3 minutos, presionar Enter |
| "SSH connection refused" | Verificar IP con `ip a`, firewall deshabilitado |

## Conclusión

Una vez completado este laboratorio, tienes un servidor Ubuntu funcional con SSH habilitado. Este será tu entorno para los laboratorios siguientes.

---

