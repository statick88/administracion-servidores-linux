# Laboratorio 1: Fundamentos WSL2 y Docker

**Unidad:** I - Fundamentos WSL2/Docker  
**Duración Estimada:** 90 minutos  
**Dificultad:** Principiante

## Introducción

En esta unidad abandonamos las máquinas virtuales pesadas (VirtualBox, VMware) y las imágenes ISO. En su lugar usamos **WSL2** (Windows Subsystem for Linux 2) para ejecutar Ubuntu 24.04 LTS de forma nativa e integrada con Windows, y **Docker Desktop** con backend WSL2 para levantar contenedores sin hipervisor tradicional.

- Contexto: WSL2 ofrece un kernel Linux real con arranque instantáneo y consumo de recursos mínimo.
- Por qué es importante: elimina la sobrecarga de las VMs clásicas y unifica tu entorno de desarrollo y administración.
- Qué aprenderás: instalar Ubuntu 24.04 en WSL2, configurar tu usuario y dejar Docker operativo para los laboratorios siguientes.

## Objetivos

- Instalar la distribución Ubuntu 24.04 en WSL2
- Configurar el usuario y validar el entorno Linux
- Instalar Docker Desktop (Windows/macOS) con backend WSL2
- Verificar Docker ejecutando `hello-world` desde dentro de WSL2

## Requisitos Previos

- Windows 10 21H2+ / Windows 11 (o macOS con Docker Desktop)
- Virtualización habilitada en el BIOS/UEFI (HVCI/VT-x)
- 20 GB de almacenamiento libre
- Conexión de red activa
- Sin necesidad de VirtualBox, VMware ni imágenes ISO

:::{.callout-note}
## 📝 NOTA

No se descarga ninguna ISO ni se crea ninguna máquina virtual. WSL2 usa una imagen ligera de la Microsoft Store y un kernel Linux mantenido por Microsoft. Esto es lo que mantiene el arranque en segundos y el consumo de RAM bajo.
:::

## Pasos del Laboratorio

### Paso 1: Listar distribuciones disponibles (10 min)

```bash
$ wsl --list --online  # <1>
The following is a list of operators that can be installed.
NAME              FRIENDLY NAME
Ubuntu-24.04      Ubuntu 24.04 LTS
Debian            Debian GNU/Linux
# <1>
```

1. **wsl --list --online** muestra las distribuciones instalables desde la Microsoft Store; confirmamos que `Ubuntu-24.04` está disponible.

### Paso 2: Instalar Ubuntu 24.04 en WSL2 (15 min)

```bash
$ wsl --install -d Ubuntu-24.04  # <1>
Downloading: Ubuntu 24.04 LTS
Installing: Ubuntu 24.04 LTS
Ubuntu 24.04 LTS has been installed.
La operación se completó correctamente.
# <1>
```

1. **wsl --install -d Ubuntu-24.04** instala y registra la distribución en WSL2; en el primer arranque te pedirá usuario y contraseña.

:::{.callout-tip}
## 💡 RECOMENDACIÓN

Si ya tienes WSL1 y quieres forzar la versión 2, ejecuta `wsl --set-default-version 2` antes de instalar. Para sistemas sin tienda (Windows Server), usa `wsl --install Ubuntu-24.04` (mismo efecto).
:::

### Paso 3: Configuración básica de usuario (10 min)

```bash
$ wsl -d Ubuntu-24.04  # <1>
Welcome to Ubuntu 24.04 LTS (GNU/Linux 5.15.0-microsoft-standard-WSL2)
alumno@DESKTOP:~$ whoami  # <2>
alumno
# <2>
```

1. **wsl -d Ubuntu-24.04** entra directamente a la shell de la distribución recién instalada.
2. **whoami** confirma que tu usuario normal (no root) está activo; úsalo para el trabajo diario.

### Paso 4: Instalar Docker Desktop en Windows (20 min)

```powershell
PS> winget install -e --id Docker.DockerDesktop  # <1>
Dirección URL de descarga: https://desktop.docker.com/...
Se ha instalado correctamente.
# <1>
```

1. **winget install Docker.DockerDesktop** instala Docker Desktop; en macOS usa el instalador oficial de docker.com.

Tras la instalación, abre Docker Desktop y en **Settings → General** activa **"Use the WSL 2 based engine"**. Luego en **Settings → Resources → WSL Integration** habilita la integración con `Ubuntu-24.04`.

:::{.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

**No instales Docker Engine con `apt install docker.io` dentro de WSL2 si ya usas Docker Desktop.**

**Lo que podría salir mal:**
- Dos daemons de Docker compiten por el socket `/var/run/docker.sock`.
- Conflictos de versión y puertos ya en uso.

**Cómo prevenirlo:**
1. Deja que Docker Desktop gestione el motor dentro de WSL2.
2. Verifica con `docker version` desde la terminal de Ubuntu, no desde PowerShell.
3. Si ves errores de permisos, usa tu usuario normal; no corras `dockerd` manualmente.
:::

### Paso 5: Verificar Docker desde dentro de WSL2 (20 min)

```bash
$ docker version  # <1>
Client: Docker Engine - Community
 Version:           27.0.0
 Server: Docker Desktop
  Engine:
   Version:          27.0.0
# <1>

$ docker run hello-world  # <2>
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
Status: Downloaded newer image for hello-world:latest
Hello from Docker!
# <2>
```

1. **docker version** confirma que el cliente y el servidor (Docker Desktop vía WSL2) responden.
2. **docker run hello-world** descarga y ejecuta un contenedor de prueba que confirma el pipeline completo.

### Paso 6: Comprobación final de recursos (15 min)

```bash
$ uname -m  # <1>
x86_64

$ free -h  # <2>
total        used        free      shared  buff/cache   available
Mem:           15Gi       4.2Gi       8.2Gi       412Mi       3.1Gi      10Gi
# <2>
```

1. **uname -m** confirma la arquitectura del kernel Linux en WSL2.
2. **free -h** muestra la memoria disponible dentro de la distribución.

## Troubleshooting

| Problema | Solución |
|----------|----------|
| "WSL 2 requiere una actualización del kernel" | Ejecuta `wsl --update` y reinicia. |
| "Docker Desktop no arranca" | Verifica virtualización en BIOS y que el engine WSL2 esté activo. |
| "permission denied en /var/run/docker.sock" | Tu usuario debe estar en el grupo docker de Docker Desktop; cierra y abre la terminal WSL2. |
| "Ubuntu no aparece en --list --online" | Conecta la Microsoft Store o usa `wsl --install Ubuntu-24.04`. |

## Conclusión

Tienes Ubuntu 24.04 LTS corriendo en WSL2 y Docker Desktop operativo con backend WSL2. Este entorno ligero y sin VMs pesadas será la base para todos los laboratorios siguientes (servidores web, bases de datos en contenedores, etc.).

## Checklist de aceptación

- [ ] `wsl --list --online` muestra `Ubuntu-24.04` disponible
- [ ] `wsl -d Ubuntu-24.04` abre una shell con mi usuario no-root
- [ ] Docker Desktop instalado con el engine WSL2 activo
- [ ] `docker version` responde desde dentro de WSL2
- [ ] `docker run hello-world` termina con "Hello from Docker!"

## Referencias

- Documentación WSL2: https://learn.microsoft.com/windows/wsl/
- Documentación Docker Desktop + WSL2: https://docs.docker.com/desktop/wsl/
