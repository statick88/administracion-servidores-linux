# Práctica VI — Diagnóstico de redes

## Introducción

**Modalidad:** análisis local sin privilegios · **Duración:** 75 minutos. Interpretarás interfaz, rutas, DNS y firewall a partir de datos sintéticos; no modificarás una red real.

::: {.callout-warning}
## ⚠️ ADVERTENCIA CRÍTICA

No ejecutes `ip link set`, `ip addr add`, `ip route add`, `nmcli`, `resolvectl`, `ufw`, `nft` ni `iptables`.

**Lo que podría salir mal:** un cambio puede cortar conectividad o alterar una LAN real.

**Cómo prevenirlo:**
1. Usa únicamente los archivos de esta práctica.
2. Formula rutas y reglas como texto, no como órdenes de cambio.
:::

## Material sintético

Crea `interfaces.txt`, `rutas.txt`, `resolv.conf.txt`, `consulta-dns.txt` y `firewall.txt` dentro de `~/evidencia-redes` con estos contenidos:

```text
# interfaces.txt
2: ens18: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 state UP
    inet 192.0.2.50/24 brd 192.0.2.255 scope global ens18
# rutas.txt
192.0.2.0/24 dev ens18 proto kernel scope link src 192.0.2.50
203.0.113.0/24 via 192.0.2.1 dev ens18
# resolv.conf.txt
search lab.example
nameserver 192.0.2.53
# consulta-dns.txt
repo.lab.example.  IN A  198.51.100.20
# firewall.txt
input: policy drop; established,related accept; lo accept; tcp dport 22 accept
output: policy accept
```

Los tres prefijos son rangos de documentación RFC 5737. Supón que `192.0.2.1` es el único gateway, `192.0.2.53` el DNS autorizado y que no hay ruta por defecto.

## Actividad guiada

1. En `analisis-red.md`, identifica interfaz, estado, IPv4/prefijo y red conectada; explica por qué el gateway está en la misma red de capa 2.
2. Explica la ruta a `203.0.113.0/24`, qué falta para `198.51.100.20` y propone **solo en texto** `default via 192.0.2.1 dev ens18`.
3. Relaciona resolver, nombre y respuesta A con HTTPS; menciona una consulta diagnóstica posible sin ejecutarla contra infraestructura ajena.
4. Decide si se permite HTTPS saliente, tráfico de retorno y SSH nuevo entrante. Señala que SSH no restringe origen y propone conceptualmente `192.0.2.0/24`.

## Entrega y comprobación

`evidencia-redes.txt` debe incluir:

```text
interfaz=ens18 estado=UP ipv4=192.0.2.50/24 red=192.0.2.0/24
ruta_estatica=203.0.113.0/24 via 192.0.2.1 dev ens18
ruta_propuesta=default via 192.0.2.1 dev ens18
resolver=192.0.2.53 nombre=repo.lab.example respuesta=198.51.100.20
https_salida=permitido retorno=permitido ssh_entrante=permitido
limitacion_ssh=sin_restriccion_de_origen propuesta_origen=192.0.2.0/24
```

```bash
grep -Fx 'ruta_propuesta=default via 192.0.2.1 dev ens18' evidencia-redes.txt  # <1>
grep -Fx 'resolver=192.0.2.53 nombre=repo.lab.example respuesta=198.51.100.20' evidencia-redes.txt  # <2>
grep -Fx 'https_salida=permitido retorno=permitido ssh_entrante=permitido' evidencia-redes.txt  # <3>
```



1. Comprueba que la ruta propuesta quedó escrita, no aplicada.
2. Comprueba el DNS sintético interpretado.
3. Comprueba la decisión de firewall.

## Rúbrica

| Criterio | Puntos |
|---|---:|
| Interfaz, dirección y red derivados | 2 |
| Rutas y ausencia de default distinguidas | 2 |
| DNS interpretado | 2 |
| Firewall y limitación SSH explicados | 3 |
| Límites offline respetados | 1 |

**Aprobación:** 7/10 y las tres comprobaciones correctas.

## Referencias

Siguiente práctica: [DHCP](lab-linux/08-dhcp.md). Fuente opcional: [revisión publicada](https://raw.githubusercontent.com/statick88/lab-linux/74eb8c9841bdccc58c03d050ad33aec897334330/docs/practicas/06-redes.md).