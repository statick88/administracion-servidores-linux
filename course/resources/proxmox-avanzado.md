# Proxmox VE avanzado: laboratorio administrativo aislado

## Propósito y límite operativo

Esta guía adapta temas de los laboratorios históricos de plantillas, contenedores, redes y copias de seguridad para una práctica **exclusivamente en infraestructura propia y aislada**. No se asigna a ninguna de las once unidades: amplía la preparación administrativa sin alterar su malla.

Trabaja solo con un host o una VM anidada que puedas identificar como laboratorio, cargas de prueba y almacenamiento desechable. No ejecutes cambios sobre un host compartido, producción o redes que no controles. No copies contraseñas, claves, direcciones internas, tokens ni capturas de consola a la bitácora.

## Puerta de entrada del laboratorio

Antes de cada sesión, registra evidencia no sensible de estas condiciones:

| Comprobación | Evidencia aceptable | Si no se cumple |
|---|---|---|
| Propiedad y aislamiento | Nombre local del laboratorio y confirmación de que no es producción | Detén la práctica. |
| Capacidad | Memoria, CPU y almacenamiento reservados para las cargas de prueba | Reduce el alcance o usa una VM desechable. |
| Reversión | Punto de recuperación y procedimiento documentado para eliminar solo recursos de prueba | No crees ni modifiques cargas. |
| Acceso administrativo | Cuenta de laboratorio con privilegios mínimos y canal de consola autorizado | No uses credenciales personales ni compartidas. |

## Plantillas y cloud-init sin secretos

Una plantilla reduce variaciones entre máquinas de prueba: define un sistema base actualizado, recursos limitados y una finalidad concreta. Cloud-init puede parametrizar el nombre de la carga, usuario de laboratorio y red privada, pero la guía no proporciona claves, contraseñas, tokens ni configuraciones reutilizables de acceso.

Para una práctica administrable, prepara **una sola** plantilla y clona una única carga efímera. Antes de iniciarla, revisa que el identificador no coincida con una carga existente, que el disco sea desechable y que la configuración no publique puertos ni reutilice secretos. Documenta el resultado como «la carga recibió la configuración prevista» sin guardar valores sensibles.

## Contenedores LXC no privilegiados y límites de recursos

Para servicios Linux de prueba, prefiere un contenedor LXC no privilegiado. Establece límites explícitos de CPU, memoria, intercambio y disco antes de arrancarlo; así puedes observar la planificación de recursos sin comprometer el host ni otras cargas.

Usa una carga mínima con datos ficticios y verifica tres aspectos: que arranca, que respeta el límite asignado y que deja de estar disponible al detenerla. No habilites contenedores privilegiados, anidamiento para Docker ni cambios globales del host como parte de esta guía: requieren una evaluación independiente y pueden debilitar el aislamiento.

## Segmentación de red y verificación de aislamiento

Separa la red de gestión del laboratorio de la red de las cargas de prueba. El objetivo es comprender el límite, no exponer servicios: utiliza una red privada sin rutas a producción, direcciones de ejemplo en la documentación y una política predeterminada de no publicar puertos.

La comprobación defensiva consiste en confirmar que una carga de prueba alcanza únicamente los destinos explícitamente autorizados dentro de la red aislada y que no tiene salida inesperada hacia el host, producción o Internet. Registra el alcance de la prueba y el resultado, no direcciones reales ni detalles de acceso. Si observas conectividad fuera del diseño, detén la sesión y revisa el aislamiento antes de continuar.

## Copia de seguridad y restauración verificable

Una instantánea sirve como punto de retorno local, pero no sustituye una copia de seguridad. Para datos ficticios, define una copia separada del almacenamiento de la carga y una retención pequeña acorde con el laboratorio. Identifica qué recurso de prueba se copiará, dónde se guardará y cuánto tiempo se conservará.

La evidencia útil es una restauración en una carga nueva y aislada: confirma que inicia, que conserva los datos ficticios esperados y que no reemplaza ninguna carga existente. Tras verificarla, elimina únicamente los recursos temporales que creaste para la prueba conforme al plan de reversión. Una copia que no se ha restaurado y comprobado sigue siendo una hipótesis, no una garantía.

## Bitácora administrativa

| Tema adaptado | Decisión registrada | Evidencia no sensible |
|---|---|---|
| Plantilla | Base elegida y motivo | Clon de prueba identificado como efímero |
| LXC | Límites y condición no privilegiada | Estado de la carga y consumo dentro del límite |
| Red | Destinos autorizados | Resultado de la comprobación de aislamiento |
| Copia | Recurso de prueba y retención | Restauración en una carga nueva verificada |

## Omisiones intencionales

No se adaptan los procedimientos de alta disponibilidad, clústeres, quorum, fencing, migraciones entre nodos, almacenamiento compartido, cambios de red del host, VLAN operativas, Docker anidado ni automatización con secretos. Esas operaciones tienen impacto potencial sobre hosts o servicios compartidos y requieren un diseño de producción, aprobación y documentación específica fuera de este curso.

## Continuación segura

Contrasta cualquier interfaz, requisito o flujo con la documentación oficial de la versión de Proxmox que uses. Antes de ampliar el laboratorio, vuelve a validar propiedad, aislamiento, reversión y ausencia de secretos; si cualquiera de esas condiciones deja de ser cierta, no continúes.
