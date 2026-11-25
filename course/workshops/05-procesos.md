# Taller: Diagnóstico de un servicio con evidencia

## Escenario práctico
Una aplicación local parece lenta y el relevo de turno necesita una evidencia breve, ordenada y útil para decidir qué revisar.

## Objetivo medible
Recopilar en un informe la carga del sistema, los cinco procesos de mayor consumo y las últimas entradas de un servicio local, distinguiendo observación de acción correctiva.

## Entorno aislado y prerrequisitos
Use una VM o WSL2 con `ps`, `free`, `uptime` y, si existe systemd, `journalctl`. Trabaje en `~/taller-procesos` sin detener servicios.

## Preparación
1. Cree la carpeta de trabajo y anote la hora inicial.
2. Elija un servicio local disponible o declare que trabajará solo con el diario del sistema.
3. Abra una segunda terminal para comparar el estado antes y después.

## Pasos guiados
1. Guarde la salida de `uptime` y `free -h` en `diagnostico.txt`.
2. Añada los cinco procesos con mayor porcentaje de CPU o memoria usando `ps`.
3. Consulte las últimas entradas del servicio seleccionado y copie solo las líneas pertinentes.
4. Etiquete cada hallazgo como normal, requiere seguimiento o no concluyente.
5. Añada una acción propuesta que sea reversible y no la ejecute.

## Síntesis
Explique por qué una métrica aislada no basta para concluir que existe una falla.

## Entregables
`diagnostico.txt` y una captura de la consulta de procesos o del diario.

## Criterios de verificación observables
- El informe contiene hora, memoria, carga, cinco procesos y registros.
- Cada hallazgo tiene una clasificación justificable.
- La acción propuesta es reversible y no altera el servicio.
