# Monitoreo básico de Linux

## Objetivo
Distinguir métricas, registros y alertas para observar un servicio antes de que afecte a sus usuarios.

## Conceptos clave
- Las **métricas** son valores numéricos a lo largo del tiempo, como uso de CPU o memoria.
- Los **registros** describen eventos concretos; `journalctl` permite consultarlos en sistemas con systemd.
- Las **alertas** notifican una condición definida sobre métricas o registros.
- Prometheus recopila métricas y Grafana ayuda a visualizarlas; ninguno sustituye el análisis del contexto.

## Ejemplo guiado
Escenario: una aplicación parece lenta durante una hora determinada.

1. Formule una pregunta: «¿aumentó la latencia y hubo errores en ese intervalo?».
2. En un panel de Grafana, compare una métrica de latencia con el intervalo observado.
3. Consulte conceptualmente los registros con `journalctl --since "10:00" --until "11:00"` para buscar eventos cercanos.
4. Defina una alerta solo si hay un umbral, una duración y una persona responsable de revisarla.

No ejecute estos comandos ni configure servicios desde este documento; el ejemplo describe el proceso de análisis.

## Ejercicio práctico
Diseñe una tabla con una métrica, un registro y una alerta para un servicio web ficticio. Indique qué pregunta responde cada fuente y quién recibiría la alerta.

## Criterios de éxito
- Clasifica correctamente un número temporal como métrica y una entrada fechada como registro.
- Explica que una alerta necesita una condición verificable, no solo una sensación de lentitud.
- Relaciona un pico de métrica con registros del mismo intervalo sin asumir causalidad inmediata.

## Referencias oficiales
- [Documentación de Prometheus](https://prometheus.io/docs/)
- [Documentación de Grafana](https://grafana.com/docs/)
- [Manual de journalctl de systemd](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html)
