# Diagnóstico y recuperación de fallos de servicios

## Objetivo
Seguir un proceso seguro para diagnosticar y recuperar un servicio que no responde, sin aplicar cambios impulsivos.

## Conceptos clave
- Un fallo de servicio es una interrupción de su función esperada, no solo un mensaje aislado.
- El estado, los registros y las dependencias aportan evidencias complementarias.
- Recuperar primero el servicio no elimina la necesidad de identificar la causa.
- Los cambios deben ser reversibles, registrados y aprobados según el procedimiento local.

## Ejemplo guiado
Escenario: un servicio de prueba deja de responder después de una actualización planificada.

1. Delimite el impacto: usuarios, hora de inicio y función que no está disponible.
2. Revise el estado con la forma conceptual `systemctl status nombre-servicio`.
3. Relacione las líneas relevantes de `journalctl -u nombre-servicio` con la hora del fallo.
4. Verifique configuración y dependencias antes de proponer una recuperación autorizada.
5. Tras la recuperación, valide una función observable y anote el resultado.

No ejecute reinicios ni cambios de configuración desde este minicurso; use un laboratorio aislado y un procedimiento aprobado.

## Ejercicio práctico
Para un servicio ficticio, redacte un parte con impacto, evidencia, hipótesis, acción de recuperación aprobada y comprobación posterior.

## Criterios de éxito
- Separa síntomas observados de hipótesis sobre la causa.
- Usa estado y registros antes de sugerir una recuperación.
- Define una comprobación posterior concreta, por ejemplo una respuesta esperada del servicio.

## Referencias oficiales
- [Manual de systemctl de systemd](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html)
- [Manual de journalctl de systemd](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html)
- [Guía de fiabilidad de Google SRE](https://sre.google/workbook/monitoring/)
