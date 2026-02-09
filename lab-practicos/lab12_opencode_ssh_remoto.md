# Laboratorio 12: OpenCode + SSH - Administración Remota de Servidores

**Unidad:** 7/12 - Redes y Seguridad, Troubleshooting  
**Duración Estimada:** 120-150 minutos  
**Dificultad:** Intermedio-Avanzado

## Objetivos

- Configurar OpenCode con MCP Server SSH para administración remota
- Establecer conexiones SSH seguras usando claves (no contraseñas)
- Ejecutar diagnósticos de sistemas remotos usando OpenCode
- Automatizar tareas repetitivas en múltiples servidores
- Crear un flujo de trabajo seguro: plan → verify → execute

## Requisitos Previos

- **Lab 4 completado:** Docker + Docker Compose v2 instalados
- **Lab 4 (Redes):** SSH configurado y funcionando
- **Anexo G:** OpenCode instalado (TUI o Desktop)
- **2 VMs:** Una local (con OpenCode) y una remota (servidor objetivo)
  - VM Local: Ubuntu Desktop o Server con GUI (para OpenCode Desktop opcional)
  - VM Remota: Ubuntu Server LTS (22.04 o 24.04)

:::{.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

Vas a configurar acceso SSH entre máquinas.

**Lo que podría salir mal:**
- Exposición de claves privadas en configuraciones
- Acceso no autorizado si las claves se filtran
- Ejecución accidental de comandos destructivos en servidores remotos

**Cómo prevenirlo:**
1. Usa claves SSH de 4096 bits (no passwords)
2. Nunca compartas tu clave privada (`~/.ssh/id_rsa`)
3. Usa ` Plan mode` en OpenCode para revisar comandos antes de ejecutar
4. Limita los comandos del MCP Server (solo lectura cuando sea posible)
:::

---

## Arquitectura del Laboratorio

```
┌─────────────────┐         SSH (Puerto 22)         ┌─────────────────┐
│   VM Local      │◄────────────────────────────────►│  VM Remota      │
│   (OpenCode)    │      Clave SSH (autenticación)   │  (Servidor)     │
│                 │                                  │                 │
│  ┌───────────┐  │                                  │  ┌───────────┐  │
│  │ MCP SSH   │  │                                  │  │  Docker   │  │
│  │  Server   │  │                                  │  │   Nginx   │  │
│  └───────────┘  │                                  │  └───────────┘  │
└─────────────────┘                                  └─────────────────┘
```

---

## Paso 0: Preparar las VMs (Ambas Máquinas)

En **ambas VMs**, asegúrate de que SSH está instalado y funcionando:

```bash
$ sudo apt update  # <1>
$ sudo apt install -y openssh-server  # <2>
$ sudo systemctl status ssh --no-pager  # <3>
# <1>
# <2>
# <3>
```

1. **apt update** actualiza el índice de paquetes
2. **apt install** instala el servidor SSH
3. **systemctl status** verifica que el servicio está corriendo

---

## Paso 1: Configurar Autenticación por Clave SSH

### 1.1 En la VM Local: Generar par de claves

```bash
$ ssh-keygen -t rsa -b 4096 -C "opencode-lab@abacom"  # <1>
Generating public/private rsa key pair.
Enter file in which to save the key (/home/usuario/.ssh/id_rsa): [Press enter]
Enter passphrase (empty for no passphrase): [Press enter - sin passphrase para el lab]
Enter same passphrase again: [Press enter]
# <1>
```

1. **ssh-keygen** crea un par de claves RSA de 4096 bits

:::{.callout-note}
**Nota:** En producción, siempre usa passphrase para proteger tu clave privada.
:::

### 1.2 Copiar la clave pública a la VM Remota

```bash
$ ssh-copy-id usuario@IP_VM_REMOTA  # <1>
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s)
usuario@192.168.1.100's password: [Ingresa el password de la VM remota]
Number of key(s) added: 1
# <1>
```

1. **ssh-copy-id** copia la clave pública al servidor remoto

### 1.3 Probar conexión SSH sin password

```bash
$ ssh usuario@IP_VM_REMOTA  # <1>
# Deberías conectarte SIN pedir password
$ exit  # <2>
# <1>
# <2>
```

1. **ssh** conecta al servidor remoto
2. **exit** cierra la sesión SSH

---

## Paso 2: Instalar y Configurar OpenCode MCP Server SSH

### 2.1 Verificar que OpenCode está instalado

```bash
$ opencode --version  # <1>
1.1.53
# <1>
```

1. **opencode --version** verifica la versión instalada

### 2.2 Instalar el MCP Server SSH

```bash
# Listar MCP servers disponibles
$ opencode mcp list | grep ssh  # <1>

# Instalar el MCP server SSH
$ opencode mcp install mcp-server-ssh  # <2>
✓ MCP server SSH instalado correctamente
# <1>
# <2>
```

1. **mcp list** busca servers relacionados con SSH
2. **mcp install** descarga e instala el MCP server

### 2.3 Configurar el MCP Server SSH

Crea el archivo de configuración:

```bash
$ mkdir -p ~/.opencode/mcp  # <1>
$ cat > ~/.opencode/mcp/ssh-servers.json << 'EOF'
{
  "mcpServers": {
    "servidor-lab": {
      "command": "npx",
      "args": ["-y", "mcp-server-ssh"],
      "env": {
        "SSH_HOST": "IP_VM_REMOTA",
        "SSH_USER": "usuario",
        "SSH_KEY_PATH": "~/.ssh/id_rsa",
        "SSH_PORT": "22"
      }
    }
  }
}
EOF
# <1>
```

1. **mkdir -p** crea el directorio de configuración MCP

:::{.callout-warning}
**Importante:** Reemplaza `IP_VM_REMOTA` y `usuario` con los valores reales de tu setup.
:::

### 2.4 Verificar la configuración

```bash
$ opencode mcp config verify  # <1>
✓ Configuración MCP válida
✓ Servidor "servidor-lab" accesible
# <1>
```

1. **mcp config verify** valida la configuración y conectividad

---

## Paso 3: Primer Diagnóstico Remoto con OpenCode

### 3.1 Iniciar OpenCode y conectar al servidor remoto

```bash
$ cd ~/proyecto-admin  # <1>
$ opencode  # <2>
```

Dentro de OpenCode TUI:

```text
# Conectar al servidor remoto via MCP
/connect mcp:servidor-lab  # <3>

# Verificar conexión
@mcp:servidor-lab whoami && hostname  # <4>
```

1. **cd** entra al directorio de trabajo
2. **opencode** inicia la interfaz TUI
3. **/connect** establece conexión con el servidor MCP
4. **@mcp:servidor-lab** ejecuta comandos en el servidor remoto

### 3.2 Ejecutar diagnóstico básico

En OpenCode (Plan mode recomendado):

```text
Prompt: "Realiza un diagnóstico completo del servidor remoto. 
Quiero saber: uso de disco, memoria, CPU, y servicios activos.
Usa solo comandos read-only."
```

Comandos que OpenCode debería sugerir:

```bash
# En el servidor remoto (via MCP)
@mcp:servidor-lab df -h  # <1>
@mcp:servidor-lab free -h  # <2>
@mcp:servidor-lab uptime  # <3>
@mcp:servidor-lab systemctl list-units --type=service --state=running  # <4>
```

1. **df -h** uso de disco
2. **free -h** uso de memoria
3. **uptime** uptime y carga del sistema
4. **systemctl list-units** servicios activos

---

## Paso 4: Flujo de Trabajo Seguro (Plan → Verify → Execute)

### 4.1 Escenario: Actualizar paquetes en el servidor remoto

**Paso 1 - Plan:**

```text
Prompt en OpenCode (Plan mode):
"Necesito actualizar todos los paquetes en el servidor remoto.
Dame un plan de 3 pasos con:
1. Comando para verificar actualizaciones disponibles (dry-run)
2. Comando para aplicar actualizaciones
3. Comando para verificar que todo está funcionando después"
```

**Paso 2 - Verify:**

Revisa el plan propuesto por OpenCode. Debería ser algo como:

```bash
# Paso 1: Verificar (dry-run)
@mcp:servidor-lab sudo apt update && sudo apt list --upgradable  # <1>

# Paso 2: Aplicar (solo si el paso 1 muestra actualizaciones)
@mcp:servidor-lab sudo apt upgrade -y  # <2>

# Paso 3: Verificar post-actualización
@mcp:servidor-lab systemctl status ssh --no-pager  # <3>
@mcp:servidor-lab df -h /  # <4>
```

1. **apt list --upgradable** muestra paquetes disponibles (sin instalar)
2. **apt upgrade -y** aplica actualizaciones
3. **systemctl status** verifica servicio crítico
4. **df -h /** verifica espacio en disco

**Paso 3 - Execute:**

Cambia a Build mode (presiona Tab) y ejecuta:

```text
@execute  # Ejecuta el plan aprobado
```

---

## Paso 5: Automatización con Custom Commands

### 5.1 Crear un comando personalizado para diagnóstico remoto

Crea el archivo de comando:

```bash
$ mkdir -p ~/proyecto-admin/.opencode/commands  # <1>
$ cat > ~/proyecto-admin/.opencode/commands/health-check.md << 'EOF'
---
description: Diagnóstico completo de servidor remoto
agent: plan
---
Realiza un health check completo del servidor remoto conectado via MCP.

Ejecuta estos comandos en orden:
1. uptime - muestra carga del sistema
2. df -h - uso de disco por filesystem
3. free -h - uso de memoria
4. systemctl --failed - servicios con fallos
5. ss -tuln - puertos en escucha

Para cada comando, muestra:
- Output del comando
- Interpretación del resultado
- Alerta si detectas valores críticos (>80% disco, >90% memoria, servicios fallidos)
- Recomendación de acción si aplica
EOF
# <1>
```

1. **mkdir -p** crea directorio de comandos personalizados

### 5.2 Usar el comando personalizado

En OpenCode:

```text
/health-check servidor-lab  # <1>
```

1. **/health-check** ejecuta el comando personalizado de diagnóstico

---

## Paso 6: Caso Práctico - Troubleshooting de Nginx Remoto

### Escenario

El servidor remoto tiene Nginx instalado y hay reportes de que no responde.

### Flujo de Troubleshooting con OpenCode

**Paso 1 - Recolección de evidencia:**

```text
Prompt en OpenCode:
"El servidor remoto tiene problemas con Nginx. 
Ejecuta comandos de diagnóstico para determinar:
1. ¿Está corriendo el servicio?
2. ¿Hay errores recientes en los logs?
3. ¿Hay problemas de configuración?
4. ¿Hay puertos en conflicto?"
```

Comandos que deberías ejecutar:

```bash
@mcp:servidor-lab systemctl status nginx --no-pager  # <1>
@mcp:servidor-lab sudo nginx -t  # <2>
@mcp:servidor-lab sudo journalctl -u nginx --since "1 hour ago" --no-pager  # <3>
@mcp:servidor-lab ss -tuln | grep :80  # <4>
```

1. **systemctl status** estado del servicio
2. **nginx -t** valida sintaxis de configuración
3. **journalctl** logs recientes del servicio
4. **ss -tuln** verifica puertos en uso

**Paso 2 - Análisis con OpenCode:**

Pega los outputs en OpenCode y pregunta:

```text
"Analiza estos resultados. ¿Cuál es la causa más probable del problema?
Propón 3 hipótesis ordenadas por probabilidad y para cada una:
- Comando de verificación
- Criterio de confirmación
- Solución propuesta"
```

**Paso 3 - Corrección (ejemplo):**

Si el problema es configuración inválida:

```bash
# Backup de la configuración actual
@mcp:servidor-lab sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak  # <1>

# Editar configuración (OpenCode puede sugerir el fix)
# ... corrección aplicada ...

# Testear configuración
@mcp:servidor-lab sudo nginx -t  # <2>

# Recargar Nginx
@mcp:servidor-lab sudo systemctl reload nginx  # <3>

# Verificar que funciona
@mcp:servidor-lab curl -I http://localhost  # <4>
```

1. **cp** crea backup antes de modificar
2. **nginx -t** valida la nueva configuración
3. **systemctl reload** recarga sin cortar conexiones
4. **curl -I** verifica que responde HTTP

---

## Entregables (Evidencia)

- [ ] Captura de `ssh-copy-id` exitoso
- [ ] Captura de conexión SSH sin contraseña
- [ ] Archivo `~/.opencode/mcp/ssh-servers.json` configurado
- [ ] Output de diagnóstico completo del servidor remoto (via OpenCode)
- [ ] Archivo `.opencode/commands/health-check.md` creado
- [ ] Log de troubleshooting de Nginx (problema simulado y resuelto)
- [ ] Resumen de aprendizajes (3-5 bullet points)

## Checklist de Aceptación

- [ ] Conexión SSH por clave funciona (sin contraseña)
- [ ] MCP Server SSH configurado y verificado
- [ ] OpenCode conecta exitosamente al servidor remoto
- [ ] Se ejecutaron comandos de diagnóstico básico (df, free, uptime)
- [ ] Se aplicó flujo Plan → Verify → Execute en al menos una tarea
- [ ] Custom command `/health-check` funciona
- [ ] Troubleshooting de Nginx completado con éxito
- [ ] Todas las capturas/documentación guardada

## Retos Adicionales (Opcionales)

### Reto 1: Múltiples Servidores

Configura MCP servers para 2 servidores remotos y:
- Compara estado entre ambos
- Identifica diferencias de configuración
- Sincroniza configuraciones si es necesario

### Reto 2: Monitorización Continua

Crea un script que:
- Se conecte cada 5 minutos al servidor remoto
- Verifique estado de servicios críticos
- Envíe alerta si algo falla
- Use OpenCode para interpretar resultados

### Reto 3: Seguridad Avanzada

Implementa:
- Fail2ban en el servidor remoto
- Configuración de SSH más restrictiva (no root, solo claves)
- Audit logging de comandos ejecutados via OpenCode

## Resumen de Comandos Clave

| Comando | Descripción |
|---------|-------------|
| `opencode mcp install mcp-server-ssh` | Instala MCP server SSH |
| `opencode mcp config verify` | Verifica configuración MCP |
| `/connect mcp:servidor-lab` | Conecta a servidor remoto |
| `@mcp:servidor-lab <comando>` | Ejecuta comando en servidor remoto |
| `/health-check servidor-lab` | Ejecuta diagnóstico personalizado |

## Referencias

- [OpenCode MCP Documentation](https://opencode.ai/docs/mcp)
- [SSH Key-Based Authentication](https://www.ssh.com/academy/ssh/key-based-authentication)
- [OpenCode Custom Commands](https://opencode.ai/docs/commands)
- [MCP SSH Server](https://github.com/modelcontextprotocol/servers/tree/main/src/ssh)

---

**Instructor:** Diego Saavedra  
**Empresa:** Abacom  
**Fecha:** Febrero 2026  
**Versión:** 1.0
