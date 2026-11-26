# Práctica guiada 05: diagnóstico integrado y seguro

## Propósito

Recupera el orden histórico de contexto, recursos, puertos, proceso, log,
hipótesis, corrección y validación. **Fuente:**
`lab-practicos/lab5b_troubleshooting_integrado.md`. En vez de Nginx, Apache,
firewall o DNS reales, se crea un fixture HTTP propio en `127.0.0.1`.

## Límites

Usa una VM desechable o estación de laboratorio; no requiere `sudo`. Todas las
solicitudes usan `127.0.0.1`: no hagas escaneos, conexiones a otros equipos,
resolución DNS, cambios en firewall, `/etc/hosts`, servicios del sistema ni pruebas
de autenticación. Si 18080 está ocupado, detente y documenta otro puerto alto; no
investigues procesos ajenos.

## Paso 1: contexto y fixture privado

```bash
set -euo pipefail
LAB="$(mktemp -d /var/tmp/gp05-diagnostico.XXXXXX)"  # <1>
WEBROOT="$LAB/web"                                  # <2>
LOG="$LAB/http.log"                                  # <3>
PIDFILE="$LAB/http.pid"                              # <4>
PORT=18080                                            # <5>
URL="http://127.0.0.1:$PORT/"                        # <6>
mkdir -p "$WEBROOT"                                  # <7>
printf '%s\n' '<h1>fixture local operativo</h1>' > "$WEBROOT/index.html" # <8>
printf 'LAB=%s\nURL=%s\n' "$LAB" "$URL"           # <9>
hostnamectl 2>/dev/null || uname -a                   # <10>
uptime                                               # <11>
free -h                                               # <12>
df -h "$LAB"                                         # <13>
```

1. Todo (página, log, PID y respuestas) queda en `$LAB`. 2. El puerto es alto y la
URL está fijada a loopback. 3. Contexto histórico: host/SO, uptime, memoria y
espacio. Conserva esta salida como evidencia.

```text
LAB=/var/tmp/gp05-diagnostico.K3lM9p
URL=http://127.0.0.1:18080/
 Static hostname: laboratorio-vm
 10:40:12 up 3:15, 1 user, load average: 0.05, 0.03, 0.00
```

## Paso 2: síntoma y puerto local

Antes de intervenir, prueba exactamente el servicio declarado. El fallo esperado es
`connection refused`; no es motivo para explorar otros puertos.

```bash
if curl --fail --silent --show-error --max-time 2 "$URL"; then exit 1; else printf 'Síntoma reproducido en %s\n' "$URL"; fi # <1>
ss -lnt "( sport = :$PORT )"                         # <2>
```

1. `curl` solo alcanza localhost y expira en dos segundos. 2. `ss` consulta solo
18080. Evidencia: `curl: (7) ... Couldn't connect to server` y ninguna fila
`LISTEN`. **Hipótesis A:** no hay un proceso del fixture en el puerto esperado.

## Paso 3: proceso, escucha y log propios

```bash
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$WEBROOT" >"$LOG" 2>&1 & # <1>
PID=$!                                                                  # <2>
printf '%s\n' "$PID" > "$PIDFILE"                                     # <3>
sleep 1                                                                 # <4>
kill -0 "$PID"                                                         # <5>
ps -p "$PID" -o pid=,stat=,args=                                       # <6>
ss -lnt "( sport = :$PORT )"                                           # <7>
tail -n 20 "$LOG"                                                      # <8>
```

1. Inicia un servidor estático propio, enlazado solo a `127.0.0.1`, y escribe su
log privado. 2. `$!` es el único PID aceptado para inspección y cierre. 3. `ps`
debe contener `http.server`, `$PORT` y `$WEBROOT`; `ss` debe mostrar `LISTEN` en
`127.0.0.1:18080`.

```text
24173 S    python3 -m http.server 18080 --bind 127.0.0.1 --directory .../web
State  Recv-Q Send-Q Local Address:Port  Peer Address:Port
LISTEN 0      5          127.0.0.1:18080      0.0.0.0:*
Serving HTTP on 127.0.0.1 port 18080 (http://127.0.0.1:18080/) ...
```

## Paso 4: validar la corrección

```bash
curl --fail --silent --show-error --max-time 2 --dump-header "$LAB/respuesta.hdr" --output "$LAB/respuesta.html" "$URL" # <1>
head -n 1 "$LAB/respuesta.hdr"                                                    # <2>
grep -F 'fixture local operativo' "$LAB/respuesta.html"                          # <3>
tail -n 20 "$LOG"                                                                  # <4>
```

1. Consulta la misma URL del síntoma y guarda evidencia privada. 2. Espera
`HTTP/... 200 OK`. 3. El cuerpo debe contener `fixture local operativo`. 4. El log
debe registrar `GET /` con 200.

```text
HTTP/1.0 200 OK
<h1>fixture local operativo</h1>
127.0.0.1 - - [30/Jan/2024 10:45:11] "GET / HTTP/1.1" 200 -
```

**Conclusión A:** el proceso propio escucha y la misma solicitud local devuelve
200. No se cambió firewall, DNS ni un servicio del sistema.

## Paso 5: incidente de puerto incorrecto

Conserva el fixture en 18080. Se reproduce el incidente histórico consultando un
solo puerto local documentado, 18081, y se corrige volviendo a la URL original.

```bash
WRONG_PORT=18081                                                       # <1>
WRONG_URL="http://127.0.0.1:$WRONG_PORT/"                             # <2>
if curl --fail --silent --show-error --max-time 2 "$WRONG_URL"; then exit 1; else printf 'Puerto incorrecto confirmado\n'; fi # <3>
ss -lnt "( sport = :$WRONG_PORT or sport = :$PORT )"                  # <4>
curl --fail --silent --show-error --max-time 2 "$URL" > "$LAB/reparado.html" # <5>
grep -F 'fixture local operativo' "$LAB/reparado.html"                # <6>
```

1. Ambos puertos son altos y de loopback. 2. La evidencia debe mostrar rechazo en
18081 y `LISTEN` solo en 18080. 3. La corrección es usar `$URL`; el contenido
esperado valida el resultado. Reporte B: síntoma, evidencia (`curl`/`ss`), hipótesis
(URL con puerto errado), corrección (18080) y validación (contenido del fixture).

## Paso 6: Host header frente a DNS

La fuente histórica pedía diferenciar ambos conceptos. No se resuelve ningún nombre:
la conexión permanece en loopback y el servidor estático no implementa virtual
hosts.

```bash
curl --fail --silent --show-error --max-time 2 -H 'Host: practica.local' "$URL" > "$LAB/host-header.html" # <1>
grep -F 'fixture local operativo' "$LAB/host-header.html"                                             # <2>
tail -n 20 "$LOG"                                                                                       # <3>
```

1. La cabecera viaja a `127.0.0.1`; `practica.local` no se consulta ni se añade a
`/etc/hosts`. 2. El contenido y el log prueban la solicitud local. **Interpretación:**
DNS traduce un nombre antes de conectar; `Host` viaja dentro de HTTP tras conectar.
Un virtual host real puede usar `Host`; este fixture no lo usa.

## Evidencias y cierre

Entrega: [ ] contexto y recursos; [ ] síntoma inicial; [ ] PID propio, `ps`, `ss`
y log; [ ] HTTP 200, cuerpo y GET 200; [ ] incidente 18081/18080; [ ] explicación
Host/DNS. Cierra incluso si falló una prueba:

```bash
case "$LAB" in /var/tmp/gp05-diagnostico.*) ;; *) exit 1;; esac # <1>
if test -r "$PIDFILE"; then                                 # <2>
  PID="$(cat "$PIDFILE")"
  case "$PID" in ''|*[!0-9]*) ;; *)
    if kill -0 "$PID" 2>/dev/null && ps -p "$PID" -o args= | grep -F -- "python3 -m http.server $PORT --bind 127.0.0.1 --directory $WEBROOT" >/dev/null; then # <3>
      kill "$PID" && wait "$PID" 2>/dev/null || true
    fi
  esac
fi
ss -lnt "( sport = :$PORT )"                                # <4>
rm -rf -- "$LAB"                                            # <5>
test ! -e "$LAB"                                            # <6>
```

1. La guarda exige la ruta privada. 2. Si el flujo falló antes de crear el PID,
la limpieza omite la señal y continúa con sus propios archivos. 3. Un PID debe ser
numérico, vivo y tener la línea de comando completa del fixture —incluidos puerto,
bind y `$WEBROOT` único— antes de recibir señal; protege contra PID obsoleto o
reutilizado. 4. Tras el cierre, `ss` no debe mostrar escucha. 5. Borra solo `$LAB`
y confirma su ausencia.

## Verificación de esta guía

No se inició servidor, no se hicieron solicitudes HTTP, no se inspeccionaron
puertos reales ni se modificó red durante la redacción. La verificación runtime se
omite deliberadamente y debe hacerse solo en el entorno aislado indicado.
