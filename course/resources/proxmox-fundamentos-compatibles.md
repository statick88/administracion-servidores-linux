# Proxmox VE: orientación compatible con Fundamentos de Linux y Virtualización Ligera

## Alcance curricular

Este recurso se limita a la relación entre un hipervisor de tipo 1, la virtualización anidada para un laboratorio y la planificación de una instalación. Se alinea con la unidad **01-fundamentos**, en particular con el uso de terminal y la instalación de Linux sin reformatear el equipo principal. No sustituye una guía operativa de producción.

## Idea clave

Proxmox VE es una plataforma de virtualización basada en Linux que administra máquinas virtuales y contenedores desde un host dedicado. En un curso inicial, el resultado esperado es reconocer la diferencia entre el equipo anfitrión, una máquina de laboratorio y las cargas que se ejecutarán dentro de ella; no configurar alta disponibilidad, redes avanzadas ni automatizaciones.

## Plan de laboratorio antes de instalar

1. Reserva un equipo de laboratorio o una máquina virtual destinada exclusivamente a la práctica.
2. Comprueba en la documentación del equipo anfitrión si admite virtualización y, si corresponde, virtualización anidada.
3. Descarga la imagen de instalación únicamente desde el sitio oficial de Proxmox y valida su integridad siguiendo la documentación vigente del proyecto.
4. Prepara una red de laboratorio y anota la forma en que accederás a la consola de administración sin exponer el host a redes no previstas.
5. Define qué disco virtual o físico se puede borrar. No continúes si no puedes identificarlo con certeza.

## Advertencia de seguridad y datos

La instalación puede reformatear por completo el disco seleccionado. Un laboratorio debe usar almacenamiento dedicado o una máquina virtual desechable. Antes de confirmar cualquier pantalla destructiva, detén la práctica, revisa el inventario de discos y solicita acompañamiento si hay dudas.

Las credenciales iniciales, direcciones internas, claves y capturas de consola son datos de laboratorio. No se incluyen en apuntes compartidos ni se reutilizan fuera del entorno autorizado.

## Relación con la unidad 01

| Tema de la unidad | Conexión con Proxmox |
|---|---|
| WSL2 y terminal | La terminal permite distinguir el sistema anfitrión, la máquina de laboratorio y el sistema administrado. |
| Instalación de Linux sin formatear el PC | La virtualización anidada permite explorar una plataforma de servidor en un entorno aislado cuando el hardware lo soporta. |

## Límites intencionales

Los laboratorios históricos sobre plantillas con cloud-init, redes LXC con VLAN, Docker dentro de LXC, Proxmox Backup Server y alta disponibilidad no se incorporan aquí. Son temas válidos para un curso posterior, pero no coinciden de forma explícita con los temas aprobados de las once unidades actuales. La decisión de añadirlos requiere ampliación curricular y prácticas aisladas revisadas.

## Lecturas de continuación

Consulta la documentación oficial de Proxmox VE para requisitos de hardware, compatibilidad de virtualización anidada, procedimiento de instalación y notas de versión. Antes de seguir cualquier procedimiento, contrástalo con la versión actual del producto y con el contexto autorizado del laboratorio.
