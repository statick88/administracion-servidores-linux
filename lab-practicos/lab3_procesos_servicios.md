# Laboratorio 3: Administración de Procesos

**Unidad:** 5 - Administración de Procesos y Servicios  
**Duración Estimada:** 90 minutos  
**Dificultad:** Intermedio

## Objetivos

- Monitorear procesos del sistema
- Gestionar procesos (iniciar, detener, pausar)
- Entender systemd y servicios
- Automatizar tareas con cron

## Requisitos Previos

- Ubuntu del Lab 1 corriendo
- Acceso SSH como "alumno"
- Permisos sudo

## Pasos del Laboratorio

### Paso 1: Monitoreo Básico de Procesos (20 min)

```bash
# Ver procesos activos
ps aux  # Todos los procesos

# Ver solo tus procesos
ps

# Más información con tree
ps auxf  # Árbol de procesos

# Usar top en tiempo real
top  # Presiona 'q' para salir

# Usar htop (más amigable)
sudo apt update && sudo apt install -y htop
htop  # Presiona 'q' para salir

# Ver procesos de usuario específico
ps -u alumno
```

### Paso 2: Gestión de Procesos - Prioridad y Señales (25 min)

```bash
# Crear proceso larga duración
sleep 3600 &  # Ejecuta en background por 1 hora
# Anota el PID mostrado (ej: [1] 12345)

# Ver procesos en background
jobs

# Ver información del proceso
ps -p 12345  # Reemplaza 12345 con tu PID

# Traer a foreground
fg  # Requiere Ctrl+Z para pausar primero
# Presiona Ctrl+Z para pausar

# Continuar en background
bg

# Matar proceso de forma suave
kill -15 12345  # SIGTERM

# Matar proceso de forma forzada (si es necesario)
kill -9 12345   # SIGKILL

# Cambiar prioridad de proceso
sleep 3600 &
# PID será diferente
# Cambiar prioridad (valor más alto = menos prioridad)
renice +10 -p [PID]
```

### Paso 3: Systemd y Servicios (20 min)

```bash
# Ver servicios disponibles
systemctl list-units --type=service

# Ver estado de servicio específico
systemctl status ssh
systemctl status networking

# Iniciar un servicio
sudo systemctl start ssh

# Detener un servicio
sudo systemctl stop ssh

# Reiniciar un servicio
sudo systemctl restart ssh

# Habilitar servicio al inicio
sudo systemctl enable ssh

# Deshabilitar servicio al inicio
sudo systemctl disable ssh

# Ver si está habilitado
systemctl is-enabled ssh

# Ver log en tiempo real
sudo journalctl -u ssh -f  # Presiona Ctrl+C para salir
```

### Paso 4: Crear Servicio Personalizado (25 min)

```bash
# Crear script simple
cat > /home/alumno/mi_servicio.sh << 'EOF'
#!/bin/bash
while true; do
    echo "$(date): Servicio ejecutándose" >> /tmp/mi_servicio.log
    sleep 5
done
EOF

# Hacer ejecutable
chmod +x /home/alumno/mi_servicio.sh

# Crear archivo de systemd
sudo cat > /etc/systemd/system/mi-servicio.service << 'EOF'
[Unit]
Description=Mi Servicio de Prueba
After=network.target

[Service]
Type=simple
User=alumno
WorkingDirectory=/home/alumno
ExecStart=/home/alumno/mi_servicio.sh
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# Recargar systemd
sudo systemctl daemon-reload

# Iniciar servicio
sudo systemctl start mi-servicio

# Verificar estado
sudo systemctl status mi-servicio

# Ver log
tail -f /tmp/mi_servicio.log  # Ctrl+C para salir

# Habilitar al inicio
sudo systemctl enable mi-servicio

# Detener servicio
sudo systemctl stop mi-servicio
```

### Paso 5: Tareas Programadas con Cron (20 min)

```bash
# Editar tabla cron del usuario actual
crontab -e

# En el editor, agrega esta línea:
# Ejecutar tarea cada 5 minutos
*/5 * * * * /home/alumno/tarea.sh

# Ver tabla cron
crontab -l

# Crear script para ejecutar
cat > /home/alumno/tarea.sh << 'EOF'
#!/bin/bash
echo "Tarea ejecutada a las $(date)" >> /tmp/cron_log.txt
EOF

chmod +x /home/alumno/tarea.sh

# Agregar a cron
(crontab -l 2>/dev/null; echo "*/5 * * * * /home/alumno/tarea.sh") | crontab -

# Verificar que se está ejecutando
sleep 305  # Espera 5+ minutos
cat /tmp/cron_log.txt

# Ver logs de cron
grep CRON /var/log/syslog | tail -10

# Remover tarea
crontab -r
```

### Paso 6: At - Tareas Puntuales (10 min)

```bash
# Instalar at (si no está)
sudo apt install -y at

# Ver si servicio está corriendo
sudo systemctl status atd

# Programar tarea para dentro de 2 minutos
echo "echo 'Tarea at ejecutada' >> /tmp/at_log.txt" | at now + 2 minutes

# Ver tareas programadas
atq

# Ver detalles de tarea
at -l

# Remover tarea (si es necesario)
# atrm [ID]
```

## Ejercicios de Práctica Independiente

### Ejercicio A: Monitoreo y Gestión (30 min)

1. Ejecuta `sleep 7200` en background
2. Usa `ps`, `jobs`, y `top` para verificar su ejecución
3. Pausa el proceso con Ctrl+Z
4. Reanúdalo con `bg`
5. Mata el proceso con `kill`
6. Verifica que terminó

### Ejercicio B: Servicio de Monitorización (30 min)

1. Crea un script que registre la hora cada 10 segundos
2. Crea un servicio systemd para ese script
3. Inicia el servicio
4. Verifica en el log que funciona
5. Habilita al inicio
6. Reinicia la VM y verifica que continúa

### Ejercicio C: Cron Schedule (20 min)

1. Crear script que registre el uso de CPU
2. Programar con cron para ejecutarse cada hora
3. Verificar en logs que se ejecutó
4. Cambiar a cada 15 minutos
5. Después de 15 min, remover

## Conceptos Clave

**Señales Comunes:**
- SIGHUP (1): Colgar
- SIGTERM (15): Terminar (default)
- SIGKILL (9): Matar (no se puede ignorar)
- SIGSTOP (19): Pausar
- SIGCONT (18): Continuar

**Formato Cron:**
```
* * * * * comando
│ │ │ │ │
│ │ │ │ └─ Día semana (0-6, 0=Domingo)
│ │ │ └─── Mes (1-12)
│ │ └───── Día (1-31)
│ └─────── Hora (0-23)
└───────── Minuto (0-59)
```

---

## Checklist de aceptación

- [ ] Incluí evidencia de monitoreo (`ps`/`top`/`htop`) y expliqué qué observé
- [ ] Creé un proceso en background y lo terminé con SIGTERM (y, si aplica, SIGKILL) con evidencia
- [ ] `mi-servicio.service` existe, inicia y genera logs (evidencia de `systemctl status` y del archivo `/tmp/mi_servicio.log`)
- [ ] Configuré una tarea de cron y evidencié al menos una ejecución en `/tmp/cron_log.txt`
- [ ] Eliminé la tarea de cron al final (para no dejar basura)
