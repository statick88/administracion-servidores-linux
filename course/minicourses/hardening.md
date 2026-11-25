# Hardening defensivo de Linux

## Objetivo
Reducir la superficie de exposición de un sistema Linux mediante decisiones defensivas verificables y reversibles.

## Conceptos clave
- El *hardening* elimina o limita funciones que no son necesarias para el propósito del sistema.
- El mínimo privilegio concede solo los permisos indispensables a cada identidad.
- Las actualizaciones, la configuración y el inventario requieren revisión continua.
- Una medida de seguridad debe probarse en un entorno aislado antes de afectar un servicio real.

## Ejemplo guiado
Escenario: se prepara una máquina virtual de práctica para alojar una aplicación interna ficticia.

1. Elabore un inventario de servicios requeridos y de cuentas que los administran.
2. Marque como candidatas a deshabilitar las funciones no requeridas, sin aplicarlo todavía.
3. Revise una política de acceso con la pregunta: «¿qué identidad necesita realmente esta acción?».
4. Planifique una copia de configuración, una prueba aislada y un paso de reversión autorizado.
5. Documente cómo comprobará que la aplicación sigue funcionando tras cada cambio.

No aplique cambios de red, cuentas, permisos ni servicios desde este documento. El laboratorio debe ser aislado y contener datos ficticios.

## Ejercicio práctico
Cree una lista defensiva de cinco controles para la máquina ficticia: inventario, actualizaciones, cuentas, servicios y registros. Añada para cada control una comprobación no invasiva.

## Criterios de éxito
- Justifica cada control según una necesidad concreta y no por acumulación de herramientas.
- Incluye una verificación y un plan de reversión para cada cambio propuesto.
- No propone explotación, automatización de ataques ni pruebas contra sistemas ajenos.

## Referencias oficiales
- [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks)
- [Guía de seguridad de systemd](https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html)
- [Guía de seguridad de OpenSSH](https://www.openssh.com/manual.html)
