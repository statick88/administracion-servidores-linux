# Práctica VIII — DHCP: ámbito, opciones, reserva y concesión

## Introducción

**Modalidad:** diseño y verificación offline · **Duración:** 75 minutos. Interpretarás una configuración ISC DHCP y una concesión ficticia, sin iniciar un servidor.

::: {.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

No instales, habilites, recargues ni inicies `isc-dhcp-server`; no abras puertos, cambies interfaces ni edites una LAN real.

**Lo que podría salir mal:** DHCP puede entregar parámetros erróneos a otros equipos.

**Cómo prevenirlo:**
1. Usa el prefijo documental `198.51.100.0/24` y archivos locales.
2. Valida solo la propuesta y registra controles previos.
:::

## Entradas sintéticas

Guarda lo siguiente como `dhcpd.conf.sintetico`:

```conf
default-lease-time 600;
max-lease-time 7200;
option domain-name "lab.example";
option domain-name-servers 198.51.100.53;
subnet 198.51.100.0 netmask 255.255.255.0 {
  range 198.51.100.100 198.51.100.150;
  option routers 198.51.100.1;
  option subnet-mask 255.255.255.0;
  option broadcast-address 198.51.100.255;
}
host impresora-aula { hardware ethernet 02:00:5e:10:00:42; fixed-address 198.51.100.42; }
```

Guarda también `lease.sintetica`:

```text
lease 198.51.100.118 {
  starts 3 2025/02/12 09:00:00;
  ends 3 2025/02/12 09:10:00;
  binding state active;
  hardware ethernet 02:00:5e:10:00:99;
  client-hostname "puesto-07";
}
```

La concesión no demuestra que la impresora haya usado su reserva.

## Actividad guiada

1. En `analisis-dhcp.md`, delimita red, máscara, broadcast, rango inclusivo y reserva; separa `.42` del pool.
2. Distingue opciones globales y de subred; explica router, DNS, dominio y máscara recibidos por un cliente dinámico.
3. Calcula `09:10 - 09:00 = 600 s`, compárala con ambos límites e identifica MAC y estado observados.
4. Explica qué evidencia faltaría para afirmar que la impresora recibió `.42`.
5. Registra dos controles previos: evitar solape con estáticas y validar sintaxis en una copia aislada, sin daemon.

## Entrega y comprobación

```text
red=198.51.100.0/24 mascara=255.255.255.0 broadcast=198.51.100.255
rango_dinamico=198.51.100.100-198.51.100.150 gateway=198.51.100.1
opciones_globales=domain-name,domain-name-servers opciones_subred=routers,subnet-mask,broadcast-address
dns=198.51.100.53 dominio=lab.example
reserva=impresora-aula mac=02:00:5e:10:00:42 ip=198.51.100.42 fuera_del_rango=si
lease_ip=198.51.100.118 mac=02:00:5e:10:00:99 estado=active duracion=600s
limites=default:600s,max:7200s evidencia_reserva=pendiente
controles=sin_solapamiento_con_estaticas,validacion_en_copia_aislada
```

```bash
grep -Fx 'rango_dinamico=198.51.100.100-198.51.100.150 gateway=198.51.100.1' evidencia-dhcp.txt  # <1>
grep -Fx 'reserva=impresora-aula mac=02:00:5e:10:00:42 ip=198.51.100.42 fuera_del_rango=si' evidencia-dhcp.txt  # <2>
grep -Fx 'lease_ip=198.51.100.118 mac=02:00:5e:10:00:99 estado=active duracion=600s' evidencia-dhcp.txt  # <3>
```



1. Comprueba rango y gateway propuestos.
2. Comprueba reserva distinta del pool.
3. Comprueba concesión y duración interpretadas.

## Rúbrica

| Criterio | Puntos |
|---|---:|
| Red, máscara, broadcast y rango | 2 |
| Opciones y efecto para cliente | 2 |
| Reserva separada del pool | 2 |
| Concesión y duración | 2 |
| Controles y límites offline | 2 |

**Aprobación:** 7/10 y comprobaciones correctas.

## Referencias

Precede a: [Apache](lab-linux/09-apache.md). Fuente opcional: [revisión publicada](https://raw.githubusercontent.com/statick88/lab-linux/74eb8c9841bdccc58c03d050ad33aec897334330/docs/practicas/08-dhcp.md).