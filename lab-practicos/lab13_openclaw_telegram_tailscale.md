# Laboratorio 11: Clawdbot (OpenClaw) + Telegram + Tailscale (Seguridad)

**Unidad:** 4/7/12 - Docker, Redes y Seguridad, Troubleshooting  
**Duracion Estimada:** 150-210 minutos  
**Dificultad:** Avanzado

## Objetivos

- Levantar **OpenClaw Gateway** en Docker sobre **Ubuntu Server LTS**.
- Conectar un bot de **Telegram** (BotFather) al gateway.
- Aplicar postura minima de seguridad (pairing, mention gating, allowlists).
- Implementar acceso administrativo por **Tailscale** (red privada) y endurecer firewall.

## Requisitos Previos

- VM **Ubuntu Server LTS** (22.04 o 24.04) con acceso SSH.
- Lab 4B completado (Docker + Docker Compose v2 instalados) o equivalente.
- Cuenta de Telegram.
- Cuenta de Tailscale (admin del tailnet) o acceso a un tailnet existente.

:::{.callout-warning}
## ⚠️ ADVERTENCIA CRITICA

Vas a trabajar con **tokens/keys** (Telegram y Tailscale).

**Lo que podria salir mal:**
- Si se filtra el token del bot, un atacante puede controlar el bot.
- Si se filtra un auth key de Tailscale, un atacante puede unir dispositivos a tu tailnet.

**Como prevenirlo:**
1. Usa placeholders en apuntes: `**TELEGRAM_BOT_TOKEN**`, `**TAILSCALE_AUTHKEY**`.
2. Guarda secretos en archivos `600` (root-only) y no los subas al repo.
3. Usa claves efimeras (ephemeral) y tags/ACLs en Tailscale.
:::

---

## Arquitectura del laboratorio (simplificada)

- **Ubuntu Server LTS (VM)**: host donde corre Docker y Tailscale.
- **OpenClaw Gateway (Docker)**: hace polling al Bot API de Telegram (no requiere puertos entrantes desde Internet).
- **Tailscale**: acceso privado al host para administracion (SSH, logs, health checks).

---

## Paso 1: Preparar el servidor (actualizacion + utilidades)

```bash
$ sudo apt update  # <1>
$ sudo apt upgrade -y  # <2>
$ sudo apt install -y ca-certificates curl git jq  # <3>
# <1>
# <2>
# <3>
```



1. **apt update** actualiza el indice de paquetes.
2. **apt upgrade** aplica actualizaciones del sistema.
3. **apt install** instala utilidades para el resto del lab.

---

## Paso 2: Descargar OpenClaw y levantar el Gateway en Docker

```bash
$ git clone https://github.com/openclaw/openclaw.git  # <1>
$ cd openclaw  # <2>
$ ./docker-setup.sh  # <3>
# <1>
# <2>
# <3>
```



1. **git clone** descarga el repo oficial de OpenClaw.
2. **cd openclaw** entra al directorio del proyecto.
3. **docker-setup.sh** deja el gateway listo via Docker Compose (y genera `.env`).

Verifica que el contenedor este arriba:

```bash
$ docker compose ps  # <1>
# <1>
```



1. **docker compose ps** confirma servicios, estado y puertos publicados.

---

## Paso 3: Crear el bot de Telegram (BotFather) y guardar el token

En Telegram:

1. Busca `@BotFather`.
2. Ejecuta `/newbot`.
3. BotFather te entrega un token tipo `123456789:AA...`.

En el servidor, guarda el token como secreto (archivo root-only):

```bash
$ sudo install -d -m 700 /etc/clawdbot  # <1>
$ sudo bash -lc 'umask 077; printf "%s\n" "TELEGRAM_BOT_TOKEN=**TELEGRAM_BOT_TOKEN**" > /etc/clawdbot/secrets.env'  # <2>
$ sudo ls -la /etc/clawdbot  # <3>
# <1>
# <2>
# <3>
```



1. **install -d** crea un directorio solo accesible por root.
2. **secrets.env** guarda el token (placeholder en el ebook; en tu VM usa el token real).
3. **ls -la** verifica permisos (deberia ser `-rw-------`).

---

## Paso 4: Conectar Telegram al Gateway

Ejecuta el comando de registro del canal Telegram usando el CLI de OpenClaw.

```bash
$ set -a  # <1>
$ sudo bash -lc 'source /etc/clawdbot/secrets.env; env | grep -E "^TELEGRAM_BOT_TOKEN="'  # <2>
$ set +a  # <3>
# <1>
# <2>
# <3>
```



1. **set -a** exporta variables del shell (para este ejemplo).
2. **source secrets.env** carga el token desde el archivo.
3. **set +a** vuelve al modo normal.

Ahora registra el canal:

```bash
$ sudo bash -lc 'source /etc/clawdbot/secrets.env; cd openclaw && docker compose run --rm openclaw-cli channels add --channel telegram --token "$TELEGRAM_BOT_TOKEN"'  # <1>
# <1>
```



1. **channels add (telegram)** registra el token para que el gateway haga polling al Bot API.

---

## Paso 5: Postura minima de seguridad (pairing + mention gating + allowlists)

Aplica (o valida) estos criterios minimos:

- DMs en modo **pairing**.
- Grupos con **requireMention: true**.
- Grupos/usuarios restringidos por allowlist (segun tu politica).

Config conceptual (referencia):

```json5
{
  channels: {
    telegram: {
      enabled: true,
      dmPolicy: "pairing",
      groups: { "*": { requireMention: true } },
    },
  },
}  # <1>
```



1. **dmPolicy + requireMention** reduce superficie: no responde a DMs desconocidos ni a grupos sin mencion.

Prueba el flujo de pairing:

1. Desde Telegram, manda un DM al bot.
2. En el servidor, lista solicitudes:

```bash
$ cd openclaw  # <1>
$ docker compose run --rm openclaw-cli pairing list telegram  # <2>
# <1>
# <2>
```



1. **cd openclaw** usa el compose correcto.
2. **pairing list** muestra solicitudes pendientes.

Aprueba el codigo (usa el codigo real que te entregue el CLI):

```bash
$ cd openclaw  # <1>
$ docker compose run --rm openclaw-cli pairing approve telegram **PAIRING_CODE**  # <2>
# <1>
# <2>
```



1. **cd openclaw** mantiene contexto.
2. **pairing approve** habilita el DM para ese usuario.

---

## Paso 6: Instalar Tailscale en Ubuntu Server LTS

```bash
$ curl -fsSL https://tailscale.com/install.sh | sh  # <1>
$ tailscale version  # <2>
# <1>
# <2>
```



1. **install.sh** instala Tailscale desde el repositorio oficial.
2. **tailscale version** valida que quedo instalado.

Une el servidor al tailnet (usa un auth key real en tu VM):

```bash
$ sudo tailscale up --authkey **TAILSCALE_AUTHKEY** --hostname clawdbot-lab --ssh --accept-dns=false  # <1>
$ tailscale status  # <2>
$ tailscale ip -4  # <3>
# <1>
# <2>
# <3>
```



1. **tailscale up** une el host al tailnet; `--ssh` habilita Tailscale SSH (opcional).
2. **tailscale status** muestra nodos y estado.
3. **tailscale ip -4** entrega la IP privada del host en el tailnet.

:::{.callout-tip}
## 💡 RECOMENDACION

Para seguridad, usa auth keys **efimeras** (ephemeral) y tags/ACLs.

**Casos de uso:**
- Laboratorios temporales (evitar llaves permanentes).
- Separar servidores por rol con tags (`tag:clawdbot`).

**Cuando aplicar:**
- Cada vez que agregas un servidor a tu tailnet.
:::

---

## Paso 7: Endurecer acceso de red (UFW + solo Tailscale)

Objetivo: dejar el host accesible para administracion solo por Tailscale.

1) Activa UFW en modo seguro:

```bash
$ sudo ufw default deny incoming  # <1>
$ sudo ufw default allow outgoing  # <2>
$ sudo ufw allow in on tailscale0 to any port 22 proto tcp  # <3>
$ sudo ufw enable  # <4>
$ sudo ufw status verbose  # <5>
# <1>
# <2>
# <3>
# <4>
# <5>
```



1. **default deny incoming** cierra trafico entrante por defecto.
2. **default allow outgoing** permite salidas (Docker pulls, Telegram polling, updates).
3. **allow in on tailscale0** permite SSH solo por la interfaz privada de Tailscale.
4. **ufw enable** activa el firewall.
5. **ufw status verbose** evidencia reglas y estado.

2) Confirma que OpenClaw no necesita puertos publicados al publico:

```bash
$ cd openclaw  # <1>
$ docker compose ps  # <2>
$ sudo ss -lntp | head -n 30  # <3>
# <1>
# <2>
# <3>
```



1. **cd** ubica el stack.
2. **docker compose ps** revisa si hay puertos expuestos innecesarios.
3. **ss -lntp** evidencia puertos en escucha.

---

## Paso 8: Verificacion (salud + logs)

```bash
$ cd openclaw  # <1>
$ docker compose exec openclaw-gateway node dist/index.js health --token "$OPENCLAW_GATEWAY_TOKEN"  # <2>
$ docker compose logs -n 200 openclaw-gateway  # <3>
# <1>
# <2>
# <3>
```



1. **cd** mantiene contexto del compose.
2. **health** valida que el gateway responde correctamente.
3. **docker compose logs** muestra errores de token, rate limits, red, etc.

---

## Paso 9 (opcional): Acceso por Tailscale desde tu equipo (Multi-OS)

::: {.panel-tabset}

### Linux

```bash
$ curl -fsSL https://tailscale.com/install.sh | sh  # <1>
$ sudo tailscale up  # <2>
$ ssh usuario@**TAILSCALE_IP_DEL_SERVIDOR**  # <3>
# <1>
# <2>
# <3>
```



1. **install.sh** instala el cliente.
2. **tailscale up** autentica el equipo en tu tailnet.
3. **ssh** conecta usando la IP privada de Tailscale.

### macOS

```bash
$ brew install --cask tailscale  # <1>
$ open -a Tailscale  # <2>
$ ssh usuario@**TAILSCALE_IP_DEL_SERVIDOR**  # <3>
# <1>
# <2>
# <3>
```



1. **brew install --cask** instala la app.
2. **open -a** abre Tailscale para login.
3. **ssh** conecta via tailnet.

### Windows

```powershell
PS> winget install Tailscale.Tailscale  # <1>
PS> Start-Process "$env:ProgramFiles\Tailscale\tailscale.exe"  # <2>
PS> ssh usuario@**TAILSCALE_IP_DEL_SERVIDOR**  # <3>
# <1>
# <2>
# <3>
```



1. **winget install** instala Tailscale.
2. **Start-Process** abre la app para autenticar.
3. **ssh** conecta usando la IP privada de Tailscale.

:::

---

## Entregables (Evidencia)

- `docker compose ps` del stack OpenClaw.
- Evidencia de canal Telegram registrado (salida de `channels add` o `channels status`).
- Evidencia de pairing (list + approve).
- `tailscale status` y `tailscale ip -4`.
- `ufw status verbose` mostrando SSH permitido solo por `tailscale0`.
- Logs del gateway (`docker compose logs -n 200 openclaw-gateway`).

## Checklist de aceptacion

- [ ] El gateway OpenClaw corre en Docker y aparece en `docker compose ps`.
- [ ] El bot de Telegram queda conectado (canal Telegram registrado).
- [ ] DMs quedan protegidos con pairing (evidencia de approve).
- [ ] El servidor queda unido a Tailscale y tiene IP privada.
- [ ] UFW queda activo con entrada restringida (SSH solo por `tailscale0`).
- [ ] Inclui evidencia de health/logs y resolvi al menos 1 problema de conexion si aparecio.
