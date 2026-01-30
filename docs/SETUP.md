# 🖥️ Guía de Configuración - Selecciona tu Entorno

Este curso soporta **4 entornos diferentes** para que puedas elegir el que mejor se adapte a tu máquina y necesidades.

---

## Opción 1: Windows + WSL2 ⭐ Recomendado para Windows

**¿Qué es WSL2?**
Windows Subsystem for Linux 2 es una capa de compatibilidad que te permite ejecutar Linux directamente en Windows sin virtualización pesada.

### Requisitos:
- Windows 10 (Build 19041 o superior) o Windows 11
- Procesador con virtualización habilitada
- RAM: 4 GB mínimo (8 GB recomendado)

### Instalación paso a paso:

#### 1. Habilita WSL2 en Windows

```powershell
# Abre PowerShell como Administrador
# Ejecuta:
wsl --install

# Esto instala:
# - Windows Subsystem for Linux
# - Docker Desktop (opcional)
# - Ubuntu 22.04 LTS (distribución por defecto)

# Reinicia tu máquina cuando se te pida
```

#### 2. Configura WSL2

```powershell
# Verifica que WSL2 está instalado
wsl --list --verbose

# Deberías ver:
# NAME            STATE           VERSION
# Ubuntu-22.04    Running         2
```

#### 3. Accede a WSL2

```powershell
# Opción 1: Desde PowerShell
wsl

# Opción 2: Desde Windows Terminal (recomendado)
# Descarga: https://www.microsoft.com/en-us/p/windows-terminal/

# Opción 3: Directo desde menú Inicio busca "Ubuntu"

# Una vez dentro, estás en un bash completo de Linux
```

#### 4. Configura tu usuario WSL2

```bash
# Una vez dentro de WSL2:
# Te pedirá crear usuario y contraseña
# Completa el setup

# Actualiza paquetes
sudo apt update
sudo apt upgrade
```

#### 5. Instala herramientas útiles para el curso

```bash
# Editor de texto
sudo apt install vim nano

# Herramientas de desarrollo
sudo apt install build-essential git curl

# Herramientas de sistema
sudo apt install net-tools htop tree

# Verificar instalaciones
which git
which gcc
which curl
```

### Acceso a archivos Windows desde WSL2

```bash
# Tu unidad C: está en
/mnt/c

# Crear carpeta de trabajo
mkdir -p /mnt/c/Users/TuUsuario/AbacomLinux
cd /mnt/c/Users/TuUsuario/AbacomLinux

# Crear proyecto
git clone https://github.com/tu-repo/curso-linux.git
```

### Uso de Docker en WSL2

```bash
# WSL2 integra muy bien con Docker
# Instala Docker Desktop para Windows
# https://www.docker.com/products/docker-desktop

# Luego en WSL2:
docker --version
docker run -it ubuntu:22.04 /bin/bash
```

### Ventajas de WSL2 para este curso:
✅ Linux completo en Windows  
✅ Sin virtualización pesada  
✅ Perfecto para desarrollo  
✅ Integración con Docker  
⚠️ No es ideal para aprender instalación del SO (es post-instalación)

### Limitaciones:
❌ Interfaz gráfica limitada  
❌ No puedes instalar GRUB o bootloader  
❌ Kernel Windows, no Linux puro

---

## Opción 2: Linux Nativo ⭐ Recomendado para aprender Linux

**¿Qué significa?**
Tienes Linux instalado directamente como tu sistema operativo principal o secundario.

### Requisitos:
- Máquina con Linux ya instalado (Ubuntu, Fedora, Debian, Arch, etc.)
- RAM: 2 GB mínimo (4 GB recomendado)

### Primeros pasos:

#### 1. Abre una terminal

```bash
# Atajo de teclado típico: Ctrl + Alt + T
# O busca "Terminal" en tu menú de aplicaciones
```

#### 2. Verifica tu distribución

```bash
# Ver información completa
cat /etc/os-release

# Ver solo versión
lsb_release -a

# Ver kernel
uname -r
```

#### 3. Actualiza tu sistema

```bash
# Para Ubuntu/Debian
sudo apt update
sudo apt upgrade

# Para Fedora/RHEL
sudo dnf upgrade

# Para Arch Linux
sudo pacman -Syu
```

#### 4. Instala herramientas de desarrollo

```bash
# Ubuntu/Debian
sudo apt install build-essential git vim nano curl net-tools

# Fedora
sudo dnf install gcc gcc-c++ make git vim nano curl net-tools

# Arch
sudo pacman -S base-devel git vim nano curl net-tools
```

### Para prácticas de instalación en Linux nativo:

#### Opción A: Usar máquina virtual (recomendado)
```bash
# Instala VirtualBox o VMware
# Descarga ISO de Ubuntu
# Crea máquina virtual
# Practica instalación sin riesgo
```

#### Opción B: Usar partición dual boot
```bash
# Crea partición adicional
# Instala otra distribución Linux
# Elige en boot cual SO usar
```

#### Opción C: Usar Docker
```bash
# Crea contenedores Linux
docker run -it ubuntu:22.04 /bin/bash
# Aprendes comandos sin virtualización
```

### Ventajas de Linux nativo:
✅ Acceso completo al sistema  
✅ Mejor rendimiento  
✅ Ideal para administración real  
✅ Perfecto para aprender Linux profundamente  
✅ Entorno profesional

### Limitaciones:
❌ Requiere Linux ya instalado  
❌ Menor protección si experimentas peligrosamente

---

## Opción 3: macOS + Máquinas Virtuales

**¿Por qué máquinas virtuales en Mac?**
macOS es compatible con Unix, pero para aprender Linux "puro" necesitas una VM con Linux instalado.

### Parte 1: macOS Nativo

#### Acceso a terminal:
```bash
# Abre Terminal.app o iTerm2
# O presiona Cmd + Espacio y escribe "Terminal"

# macOS es UNIX, así que muchos comandos Linux funcionan
uname -a
pwd
ls -la
```

#### Instala Homebrew (gestor de paquetes para Mac)
```bash
# En Terminal:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Luego puedes instalar herramientas
brew install git vim curl
```

### Parte 2: Máquina virtual para Linux

**Opciones según tu procesador:**

#### Si tienes Mac Intel:

**Opción A: VirtualBox (gratuito)**
```bash
brew install virtualbox

# O descarga desde: https://www.virtualbox.org/
```

**Opción B: Parallels Desktop (pagado, ~$100/año)**
```
Descarga desde: https://www.parallels.com/
```

#### Si tienes Mac Apple Silicon (M1/M2/M3):

**Opción A: UTM (gratuito) ⭐ Recomendado**
```bash
brew install utm

# O descarga desde: https://mac.getutm.app/
```

**Opción B: Parallels Desktop (pagado)**
```
Mejor rendimiento en Apple Silicon
Descarga desde: https://www.parallels.com/
```

**Opción C: VMware Fusion (pagado)**
```
Descarga desde: https://www.vmware.com/products/fusion/
```

### Crear máquina virtual en Mac:

#### Con UTM (Para Apple Silicon):
```
1. Descarga UTM desde https://mac.getutm.app/
2. Abre UTM
3. Click "+" → Create a new virtual machine
4. Selecciona: Emulate
5. Operating System: Linux
6. Architecture: ARM64 (importante para M1/M2/M3)
7. Descarga imagen Ubuntu 22.04 ARM64
8. Completa el wizard
9. Inicia VM
```

#### Con VirtualBox (Para Intel):
```
1. Instala VirtualBox
2. File → New
3. Name: Ubuntu 22.04
4. Type: Linux, Version: Ubuntu 64-bit
5. RAM: 4096 MB
6. Crea disco virtual: 50 GB
7. Configura ISO de Ubuntu
8. Inicia y sigue instalador
```

### Ventajas:
✅ macOS + Linux en la misma máquina  
✅ Protección completa  
✅ Aprender Linux puro y macOS  
✅ Excelente para desarrollo

### Limitaciones:
❌ Requiere máquina potente (RAM, disco)  
❌ Algunas opciones son pagadas

---

## Opción 4: Docker (Contenedores) ⭐ Para aprender rápido

**¿Qué es Docker?**
Docker crea "máquinas Linux ligeras" llamadas contenedores. Son como máquinas virtuales pero mucho más rápidas.

### Instalación:

#### En Windows:
```powershell
# Descarga Docker Desktop
# https://www.docker.com/products/docker-desktop

# Instala siguiendo el wizard
# Requiere WSL2 habilitado

# Verifica instalación
docker --version
```

#### En macOS:
```bash
# Opción 1: Homebrew
brew install docker

# Opción 2: Descarga Docker Desktop
# https://www.docker.com/products/docker-desktop

# Verifica
docker --version
```

#### En Linux:
```bash
# Ubuntu/Debian
sudo apt install docker.io

# Fedora
sudo dnf install docker

# Arch
sudo pacman -S docker

# Inicia servicio
sudo systemctl start docker

# Verifica
docker --version
```

### Primeros pasos con Docker:

#### Ejecuta un contenedor Ubuntu:
```bash
# Descarga e inicia
docker run -it ubuntu:22.04 /bin/bash

# Ahora estás dentro de Ubuntu
# Prueba comandos
apt update
apt install vim curl

# Sale con: exit
```

#### Crear tu propia imagen (Dockerfile):

```dockerfile
# Crear archivo: Dockerfile
FROM ubuntu:22.04

# Actualiza paquetes
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    vim \
    nano \
    curl \
    net-tools \
    htop \
    tree

# Crea directorio de trabajo
WORKDIR /workspace

# Comando por defecto
CMD ["/bin/bash"]
```

```bash
# Construir imagen
docker build -t mi-ubuntu-curso .

# Ejecutar contenedor
docker run -it mi-ubuntu-curso

# Dentro del contenedor tienes todas las herramientas
```

#### Trabajar con archivos desde Docker:

```bash
# Montar carpeta local en contenedor
docker run -it -v /path/to/local:/workspace ubuntu:22.04 /bin/bash

# Ahora /workspace en el contenedor = tu carpeta local
# Los cambios se sincronizan automáticamente
```

### Ventajas de Docker:
✅ Ultraligero y rápido  
✅ Fácil de crear y destruir  
✅ Reproducible en cualquier máquina  
✅ Perfecto para aprender comandos  
✅ Ideal para probar servicios

### Limitaciones:
❌ No es una máquina "completa"  
❌ No puedes instalar bootloader/GRUB  
❌ Kernel compartido del host  

---

## 📊 Tabla de Comparación

| Aspecto | WSL2 | Linux Nativo | macOS + VM | Docker |
|---------|------|---------|-----------|--------|
| **Facilidad** | Muy fácil | Fácil | Fácil | Muy fácil |
| **Rendimiento** | Excelente | Excelente | Bueno | Excelente |
| **SO Completo** | Sí | Sí | Sí | Parcial |
| **Aprender instalación** | No | Sí* | Sí | No |
| **Aprender comandos** | Sí | Sí | Sí | Sí |
| **Precio** | Gratis | Gratis | Gratis-$100 | Gratis |
| **Nivel de control** | Medio | Máximo | Alto | Bajo |
| **Ideal para** | Dev | Admin | Principiantes | Aprendizaje rápido |

*Con máquina virtual adicional

---

## 🎯 Recomendaciones

### Si tienes Windows:
→ **WSL2** para desarrollo rápido  
→ **VirtualBox** para aprender instalación  
→ **Docker** para probar servicios

### Si tienes Linux:
→ **Linux nativo** para aprender en serio  
→ **Docker** para laboratorios rápidos  
→ **Máquina virtual** para instalar otra distro

### Si tienes Mac Intel:
→ **macOS nativo** para desarrollo  
→ **VirtualBox** para Linux (gratuito)  
→ **Parallels** para mejor rendimiento (pagado)

### Si tienes Mac Apple Silicon (M1/M2/M3):
→ **UTM** para máquinas virtuales (gratuito)  
→ **Parallels** para mejor rendimiento (pagado)  
→ **Docker** para contenedores rápidos

### Para máximo aprendizaje (ideal):
→ **Linux nativo** (aprendes administración real)  
→ **+ Docker** (para servicios y laboratorios)  
→ **+ Máquina virtual** (para instalar otras distros)

---

## ✅ Verifica tu entorno

Ejecuta estos comandos en tu entorno elegido:

```bash
# 1. Ver información del sistema
uname -a

# 2. Ver shell
echo $SHELL

# 3. Ver user
whoami

# 4. Ver PATH
echo $PATH

# 5. Instalar git si no lo tienes
# Windows+WSL2: apt install git
# macOS: brew install git
# Linux: apt install git (o dnf/pacman)

git --version

# 6. Clonar este repositorio
git clone https://github.com/tu-repo/curso-linux.git
cd curso-linux

# ¡Si todo funciona, estás listo para el curso!
```

---

## 📚 Documentación Oficial

- **WSL2**: https://learn.microsoft.com/en-us/windows/wsl/
- **Docker**: https://docs.docker.com/
- **macOS Terminal**: https://support.apple.com/en-us/HT201236
- **Linux Command Line**: https://linux.die.net/man/
- **Ubuntu**: https://ubuntu.com/

---

## 💬 ¿Tienes problemas?

Si tu entorno no funciona, sigue estos pasos:

1. **Verifica versiones:**
   ```bash
   uname -a          # Sistema
   bash --version    # Shell
   git --version     # Git
   ```

2. **Busca en Google** el error específico

3. **Consulta documentación oficial** de tu SO

4. **Contacta al instructor** con detalles específicos

---

**¡Listo para comenzar el curso!** 🚀

Selecciona tu entorno arriba y sigue la guía paso a paso.
