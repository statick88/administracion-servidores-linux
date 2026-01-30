# 🖥️ Guía de Configuración del Entorno

Tienes **4 opciones** para ejecutar Linux y seguir este curso. Elige la que mejor se adapte a tu máquina.

> **Consejo:** Si no sabes cuál elegir, ir a la sección [Recomendaciones](#-recomendaciones) al final.

---

## Opción 1: Windows + WSL2 ⭐ Mejor para Desarrolladores en Windows

**¿Qué es WSL2?**

Windows Subsystem for Linux 2 te permite ejecutar un kernel Linux completo directamente en Windows. Es como tener "Linux como programa" en tu PC.

**¿Por qué WSL2?**
- 🚀 Más rápido que máquinas virtuales
- 💾 Menos requisitos de almacenamiento
- 🔄 Integración perfecta con Windows
- 🐳 Excelente para Docker

**Requisitos Mínimos:**

```
Windows 10 Build 19041+ o Windows 11
Procesador: Cualquiera moderno (Intel VT-x o AMD-V)
RAM: 4 GB (8 GB recomendado para este curso)
Disco: 20 GB disponibles
```

### Instalación (3 pasos simples)

#### Paso 1: Instalar WSL2

Abre **PowerShell como Administrador** (clic derecho → "Ejecutar como Administrador")

```powershell
# Instala WSL2 con Ubuntu 22.04
wsl --install

# Si tienes WSL1 antiguo:
wsl --install -d Ubuntu-22.04
```

Después, **reinicia tu PC**.

#### Paso 2: Primera conexión

Después del reinicio, WSL te pedirá crear usuario y contraseña:

```
Enter new UNIX username: tu_usuario
New password: [escribe algo que recuerdes]
Retype new password: [confirma]
```

#### Paso 3: Verifica que funciona

```powershell
# Abre PowerShell de nuevo y verifica
wsl --list --verbose

# Deberías ver algo como:
# NAME            STATE           VERSION
# Ubuntu-22.04    Running         2

# O simplemente entra a WSL
wsl
```

### Usar WSL2 para el Curso

**Opción A: PowerShell (Windows Terminal)**

```powershell
# Desde PowerShell o Windows Terminal
wsl

# Ahora estás en bash de Linux
whoami
pwd
ls
```

**Opción B: Acceso directo desde menú**

Presiona `Win` y busca "Ubuntu" → click → abre terminal Linux directo

**Opción C: Windows Terminal (recomendado)**

```powershell
# Descarga gratis desde Microsoft Store
# O: https://www.microsoft.com/en-us/p/windows-terminal/

# Luego tienes pestaña "Ubuntu" en Windows Terminal
```

### Primeras configuraciones útiles

```bash
# Actualizar paquetes (SIEMPRE haz esto primero)
sudo apt update
sudo apt upgrade -y

# Instalar herramientas de desarrollo
sudo apt install -y \
  build-essential \
  git \
  vim \
  nano \
  curl \
  wget \
  net-tools \
  htop \
  tree

# Verificar que todo está
git --version
gcc --version
python3 --version
```

### Acceso a archivos Windows desde WSL2

Tu unidad `C:` está en `/mnt/c`:

```bash
# Ver contenidos de Documentos
ls /mnt/c/Users/TuUsuario/Documents

# Crear carpeta de trabajo
mkdir -p /mnt/c/Users/TuUsuario/CursoLinux
cd /mnt/c/Users/TuUsuario/CursoLinux

# Crear archivos aquí = los ves en Windows
touch archivo.txt
# Lo ves en Explorador de archivos
```

### Docker en WSL2

```bash
# Instala Docker Desktop para Windows
# https://www.docker.com/products/docker-desktop

# En WSL2 luego puedes usar:
docker --version
docker run -it ubuntu:22.04 /bin/bash
```

### Ventajas y Limitaciones

**✅ Ventajas:**
- Linux completo sin virtualización pesada
- Perfecto para desarrollo en Windows
- Excelente para Docker
- No consume mucho disco

**⚠️ Limitaciones:**
- NO es ideal para aprender instalación del SO
- Interfaz gráfica muy limitada
- Es kernel Windows, no Linux puro

---

## Opción 2: Linux Nativo ⭐ La Mejor Opción para Aprender Serio

**¿Qué significa?**

Tu computadora ya tiene Linux instalado como sistema operativo (ya sea como único SO o dual-boot con Windows/macOS).

**¿Por qué es lo mejor?**
- 🎯 Acceso completo y real al sistema
- ⚡ Máximo rendimiento
- 🔐 Entorno profesional auténtico
- 📖 Aprendes administración real, no simulada

### Requisitos:

```
Máquina con Linux ya instalado (Ubuntu, Fedora, Debian, Arch, etc.)
RAM: 2 GB mínimo (4 GB recomendado)
Terminal de comandos accesible
```

### Verificar tu sistema

**Abre una terminal** (Ctrl+Alt+T típicamente, o busca "Terminal" en menú)

```bash
# Ver distribución y versión completa
cat /etc/os-release

# Ejemplo de salida:
# NAME="Ubuntu"
# VERSION="22.04.1 LTS"
# ID=ubuntu
```

```bash
# Ver solo la versión
lsb_release -a

# Ver versión del kernel
uname -r
```

### Mantener tu sistema actualizado

**Para Ubuntu/Debian:**

```bash
sudo apt update     # Actualiza lista de paquetes
sudo apt upgrade    # Instala actualizaciones
sudo apt autoremove # Limpia paquetes viejos
```

**Para Fedora/RHEL:**

```bash
sudo dnf upgrade
```

**Para Arch Linux:**

```bash
sudo pacman -Syu
```

### Instalar herramientas necesarias para el curso

**Ubuntu/Debian:**

```bash
sudo apt install -y \
  build-essential \
  git \
  vim \
  nano \
  curl \
  wget \
  net-tools \
  htop \
  tree \
  openssh-client \
  openssh-server
```

**Fedora/RHEL:**

```bash
sudo dnf install -y \
  gcc \
  gcc-c++ \
  make \
  git \
  vim \
  nano \
  curl \
  wget \
  net-tools \
  htop \
  tree \
  openssh-clients \
  openssh-server
```

**Arch Linux:**

```bash
sudo pacman -S \
  base-devel \
  git \
  vim \
  nano \
  curl \
  wget \
  net-tools \
  htop \
  tree \
  openssh
```

### Para Practicar Instalación de Linux

Si YA tienes Linux nativo, pero quieres practicar la instalación, tienes 3 opciones:

**Opción A: Máquina Virtual (Recomendado)**

```bash
# Instala VirtualBox
sudo apt install virtualbox

# O descarga desde: https://www.virtualbox.org/

# Luego:
# 1. Descarga ISO de Ubuntu
# 2. Crea máquina virtual vacía
# 3. Practica la instalación sin riesgo
```

**Opción B: Partición Dual Boot**

```bash
# Crea partición adicional en tu disco
# Instala otra distribución Linux en esa partición
# Elige cuál SO usar al arrancar

# ⚠️ REQUIERE CUIDADO: puedes perder datos
# Haz backup ANTES de intentarlo
```

**Opción C: Docker**

```bash
# Crea contenedores Linux
docker run -it ubuntu:22.04 /bin/bash

# Dentro del contenedor tienes un "Linux completo"
# Perfecto para aprender comandos sin virtualización
```

### Ventajas y Limitaciones

**✅ Ventajas:**
- Acceso completo y real al sistema
- Mejor rendimiento posible
- Ideal para administración de sistemas
- Aprendizaje profesional auténtico

**⚠️ Limitaciones:**
- Requiere tener Linux ya instalado
- Menor protección al experimentar (podrías afectar tu SO principal)

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
