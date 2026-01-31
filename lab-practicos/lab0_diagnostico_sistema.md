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
$ cat /etc/os-release
$ uname -r
$ uname -m
```

### Paso 2: CPU y Memoria (10 min)

```bash
$ lscpu
$ free -h
```

### Paso 3: Disco y Filesystem (10 min)

```bash
$ df -h
$ lsblk
```

### Paso 4: Red Basica (10-15 min)

```bash
$ ip a
$ ip route
$ ping -c 3 8.8.8.8
```

## Validacion

Marca cuando completes cada punto:

- [ ] Identifique distribucion y version
- [ ] Identifique version del kernel y arquitectura
- [ ] Revise RAM disponible
- [ ] Revise almacenamiento disponible
- [ ] Valide conectividad de red (ping)

## Conclusión

Con esta informacion ya puedes operar con seguridad el entorno del curso (y reportar problemas rapido).
