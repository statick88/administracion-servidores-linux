# Taller VIII: DHCP con evidencia sintética y sin transmisión

## Escenario práctico

Este taller alinea el alcance, las opciones, las reservaciones, los *leases* y la política de firewall de la Unidad VIII sin levantar un servicio. Todo el material es preparado, ficticio y de documentación: no se toca una configuración del equipo ni una red real.

## Objetivo medible

Interpretar una configuración sintética de ISC `dhcpd`, relacionar una reservación con un lease de evidencia y justificar la política UDP 67 de una interfaz de laboratorio inexistente.

## Entorno aislado y prerrequisitos

Trabaje sobre una copia de texto dentro de una VM desechable con instantánea. Las direcciones `192.0.2.0/24` pertenecen a documentación; `lab-dhcp0` es un nombre de interfaz ficticio.

:::{.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

**Este es un ejercicio de inspección, no de operación.** No se inicia ningún demonio y no se transmite DHCP a una LAN, Wi-Fi, puente, interfaz institucional ni adaptador del anfitrión.

**Lo que podría salir mal:**
- Convertir una configuración de ejemplo en un servidor que compita con el DHCP real.
- Aplicar una regla de firewall fuera de una red de práctica.

**Cómo prevenirlo:**
1. Use solo los archivos preparados de esta guía y una VM desechable.
2. Limítese a la validación de sintaxis indicada; no use `systemctl`, `dhclient`, `ip netns` ni UFW en un sistema real.
:::

## Pasos guiados: artefactos preparados

### Configuración sintética: `dhcpd.conf.sintetico`

```text
authoritative;
default-lease-time 600;
max-lease-time 3600;
option domain-name "lab.example.test";
option domain-name-servers 192.0.2.53;

subnet 192.0.2.0 netmask 255.255.255.0 {
    range 192.0.2.100 192.0.2.120;
    option routers 192.0.2.1;
    option broadcast-address 192.0.2.255;
}

host cliente-reservado {
    hardware ethernet 02:00:00:00:00:08;
    fixed-address 192.0.2.50;
    option host-name "cliente-reservado";
}
```

La reserva queda fuera del rango dinámico. El scope, DNS, router y broadcast son valores de documentación y no identifican infraestructura real.

### Lease de evidencia: `dhcpd.leases.evidencia`

```text
lease 192.0.2.50 {
  starts 4 2026/11/15 10:00:00;
  ends 4 2026/11/15 10:10:00;
  hardware ethernet 02:00:00:00:00:08;
  client-hostname "cliente-reservado";
  binding state active;
}
```

La MAC y la IP vinculan este lease preparado con `cliente-reservado`; `binding state active` es la evidencia que se debe registrar, no una concesión obtenida en la red.

### Política de firewall de evidencia

```text
Estado: política preparada; no aplicada
67/udp on lab-dhcp0             ALLOW IN    Anywhere
68/udp on lab-dhcp0             salida permitida por política de laboratorio
```

La política representa que el servidor recibiría UDP 67 en una interfaz aislada ficticia. No se agrega ni modifica ninguna regla; el broadcast inicial requeriría no filtrar el origen `0.0.0.0` solo dentro de ese segmento hipotético.

## Validación solo de sintaxis

La única comprobación ejecutable autorizada, si la VM desechable ya dispone de `dhcpd`, es una validación sin daemon, interfaz ni paquetes DHCP:

```bash
$ dhcpd -t -cf laboratorio/dhcpd.conf.sintetico
```

Resultado esperado: salida sin errores y código `0`. La evidencia debe incluir el comando, el código de salida y una copia saneada de los tres artefactos preparados. No se arranca `isc-dhcp-server` después de esta comprobación.

## Entregables y rúbrica breve

| Evidencia | Criterio observable | Puntos |
|---|---|---:|
| `dhcpd.conf.sintetico` | Scope, opciones y reservación coherentes | 35 |
| `dhcpd.leases.evidencia` | MAC, IP reservada y estado relacionados | 25 |
| Política de firewall preparada | UDP 67 y alcance ficticio justificados | 20 |
| Validación de sintaxis | Código `0`; sin daemon ni transmisión | 20 |
| **Total** | | **100** |

## Criterios de verificación observables

- La configuración usa exclusivamente el rango de documentación `192.0.2.0/24`.
- La reservación, el lease y la política se pueden correlacionar sin capturar tráfico.
- La evidencia declara que no hubo daemon, LAN ni transmisión DHCP.
