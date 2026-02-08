# Laboratorio 0: Diagnostico Basico del Sistema

**Unidad:** 1 - Introduccion a Linux  
**Duracion Estimada:** 45-60 minutos  
**Dificultad:** Principiante

## Objetivos

- Identificar distribucion y version de Linux
- Identificar version del kernel
- Verificar recursos basicos del sistema (CPU, RAM, disco)
- Confirmar conectividad de red basica

## Requisitos Previos

- Acceso a una VM o maquina Linux
- Acceso a una terminal con permisos sudo (si aplica)

## Pasos del Laboratorio

### Paso 1: Identidad del Sistema (10 min)

```bash
$ cat /etc/os-release  # <1>
$ uname -r  # <2>
$ uname -m  # <3>
```



1. **cat /etc/os-release** muestra distribucion y version.
2. **uname -r** muestra la version del kernel.
3. **uname -m** muestra la arquitectura (x86_64/arm64).

### Paso 2: CPU y Memoria (10 min)

```bash
$ lscpu  # <1>
$ free -h  # <2>
```



1. **lscpu** muestra informacion de CPU.
2. **free -h** muestra memoria en formato legible.

### Paso 3: Disco y Filesystem (10 min)

```bash
$ df -h  # <1>
$ lsblk  # <2>
```



1. **df -h** muestra uso de disco por filesystem.
2. **lsblk** muestra discos/particiones y montaje.

### Paso 4: Red Basica (10-15 min)

```bash
$ ip a  # <1>
$ ip route  # <2>
$ ping -c 3 8.8.8.8  # <3>
```



1. **ip a** muestra interfaces e IP.
2. **ip route** muestra la ruta por defecto (gateway).
3. **ping** valida conectividad basica (ICMP).

## Conclusión

Con esta informacion ya puedes operar con seguridad el entorno del curso (y reportar problemas rapido).

## Checklist de aceptación

- [ ] Incluí la salida de `cat /etc/os-release` en mi evidencia
- [ ] Incluí la salida de `uname -r` y `uname -m` en mi evidencia
- [ ] Incluí la salida de `free -h` en mi evidencia
- [ ] Incluí la salida de `df -h` y `lsblk` en mi evidencia
- [ ] Incluí la salida de `ip a`, `ip route` y `ping -c 3 8.8.8.8` en mi evidencia
