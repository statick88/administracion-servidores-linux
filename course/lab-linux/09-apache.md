# Práctica IX — Apache: sitio virtual local

## Introducción

**Objetivo:** publicar una página propia y demostrar un virtual host con archivos y registros producidos por ti. Hazlo solo en una VM aislada, desechable, sin adaptador puente ni puertos publicados. Todas las escuchas y peticiones son `127.0.0.1`.

::: {.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

No ejecutes la práctica en el host, no edites `/etc/apache2`, no uses `systemctl` y no habilites módulos o sitios globales.

**Lo que podría salir mal:** una instancia administrada puede interferir con otros servicios o quedar expuesta.

**Cómo prevenirlo:**
1. Ejecuta una configuración independiente bajo tu directorio de laboratorio.
2. Comprueba sintaxis antes de iniciar y detén solo el PID que guardaste.
:::

## Preparación

Instala Apache solo en la VM si falta, mediante el procedimiento autorizado por el docente. No habilites módulos globalmente: la configuración de laboratorio carga explícitamente `headers` si existe en la ruta indicada.

```bash
export LAB="$HOME/lab-web-ix"  # <1>
mkdir -p "$LAB"/{publico,logs,run}  # <2>
printf '<h1>Apache IX: evidencia de TU_NOMBRE</h1>\n' > "$LAB/publico/index.html"  # <3>
apachectl -M | grep -E '(mpm|headers|log_config)' > "$LAB/modulos-disponibles.txt"  # <4>
```



1. Define un directorio propiedad del estudiante.
2. Crea contenido, registros y PID fuera de directorios administrados.
3. Genera una página de evidencia con tu identidad.
4. Conserva el inventario de módulos para justificar cualquier diferencia de la VM.

## Configuración

Guarda `apache.conf` sustituyendo `TU_USUARIO`, `TU_NOMBRE` y, si fuera necesario, la ruta del MPM conforme a `modulos-disponibles.txt`.

```apache
ServerRoot "/etc/apache2"
PidFile "/home/TU_USUARIO/lab-web-ix/run/apache.pid"
Listen 127.0.0.1:8080
LoadModule mpm_event_module /usr/lib/apache2/modules/mod_mpm_event.so
LoadModule authz_core_module /usr/lib/apache2/modules/mod_authz_core.so
LoadModule headers_module /usr/lib/apache2/modules/mod_headers.so
LoadModule log_config_module /usr/lib/apache2/modules/mod_log_config.so
<VirtualHost 127.0.0.1:8080>
  ServerName apache-ix.local
  DocumentRoot "/home/TU_USUARIO/lab-web-ix/publico"
  <Directory "/home/TU_USUARIO/lab-web-ix/publico">
    Require all granted
    Options -Indexes
  </Directory>
  Header always set X-Lab-Estudiante "TU_NOMBRE"
  ErrorLog "/home/TU_USUARIO/lab-web-ix/logs/error.log"
  CustomLog "/home/TU_USUARIO/lab-web-ix/logs/access.log" combined
</VirtualHost>
```

`Directory` restringe el contenido publicado y los logs permanecen fuera de `DocumentRoot`.

## Validación, evidencia y cierre

Primero valida; solo si ambas órdenes son correctas, inicia una instancia manual y realiza una petición loopback.

```bash
apachectl -t -f "$LAB/apache.conf" | tee "$LAB/sintaxis.txt"  # <1>
apachectl -t -D DUMP_VHOSTS -f "$LAB/apache.conf" | tee "$LAB/vhosts.txt"  # <2>
apache2 -f "$LAB/apache.conf" -DFOREGROUND & PID=$!; printf '%s\n' "$PID" > "$LAB/run/pid"  # <3>
sleep 1; curl --noproxy '*' -i http://127.0.0.1:8080/ | tee "$LAB/respuesta-http.txt"  # <4>
tail -n 1 "$LAB/logs/access.log" | tee "$LAB/acceso-observado.txt"  # <5>
case "$PID" in (*[!0-9]*|'') exit 1;; esac; kill "$PID"; wait "$PID" 2>/dev/null || true  # <6>
kill -0 "$PID" 2>/dev/null && echo 'PID aún activo' || echo 'PID detenido'  # <7>
```



1. Valida sintaxis sin abrir una escucha.
2. Guarda el virtual host resuelto.
3. Inicia únicamente la instancia de esta práctica y registra su PID numérico.
4. Solicita el servidor exclusivamente por loopback.
5. Guarda el acceso generado por tu petición.
6. Detiene únicamente el proceso iniciado en el paso 3.
7. Confirma el cierre sin señalar ni terminar procesos ajenos.

Entrega `apache.conf`, `sintaxis.txt`, `vhosts.txt`, respuesta HTTP, acceso y `error.log` si hubo fallo. Deben mostrar `200`, `X-Lab-Estudiante`, el contenido propio y ruta `/`.

## Rúbrica

| Evidencia | Puntos |
|---|---:|
| Vhost loopback, nombre y DocumentRoot propios | 2 |
| Módulos justificados y directorio restrictivo | 2 |
| Sintaxis y vhost correctos | 2 |
| Respuesta local con cabecera y contenido | 2 |
| Log y cierre del PID propio | 2 |

## Referencias

La siguiente guía reutiliza esta configuración, pero IX debe quedar detenido antes de empezar: [Nginx + Apache](lab-linux/10-nginx-apache.md). Fuente opcional: [revisión publicada](https://raw.githubusercontent.com/statick88/lab-linux/74eb8c9841bdccc58c03d050ad33aec897334330/docs/practicas/09-apache.md).