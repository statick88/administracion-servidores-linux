# Laboratorio 4: Redes y SSH

**Unidad:** 7 - Redes y Seguridad Básica  
**Duración Estimada:** 120 minutos  
**Dificultad:** Intermedio-Avanzado

## Objetivos

- Configurar redes en Linux
- Entender SSH y autenticación con claves
- Configurar firewall básico
- Diagnosticar problemas de red

## Requisitos Previos

- Ubuntu del Lab 1 corriendo
- Acceso SSH como "alumno"
- Permisos sudo

## Pasos del Laboratorio

### Paso 1: Diagnóstico de Red (15 min)

```bash
# Ver interfaces de red
ip link show

# Ver direcciones IP asignadas
ip addr show

# Ver tabla de routing
ip route show

# Testear conectividad DNS
nslookup google.com
dig google.com

# Testear conexión a host
ping -c 4 8.8.8.8

# Información completa de configuración
ifconfig  # o ip a
```

### Paso 2: Configuración de Red (Netplan) (20 min)

```bash
# Ver archivos de netplan
ls -la /etc/netplan/

# Ver configuración actual
cat /etc/netplan/00-installer-config.yaml

# Crear respaldo
sudo cp /etc/netplan/00-installer-config.yaml /etc/netplan/00-installer-config.yaml.bak

# Editar configuración (solo si necesita IP fija)
sudo nano /etc/netplan/01-static.yaml

# Ejemplo de IP fija:
cat > /tmp/netplan-ejemplo.yaml << 'EOF'
network:
  version: 2
  ethernets:
    eth0:
      addresses:
        - 192.168.1.100/24
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]
EOF

# NO ejecutes este cambio, solo es referencia
# Para aplicar cambios:
# sudo netplan apply
```

### Paso 3: SSH y Autenticación por Claves (30 min)

```bash
# Verificar que SSH está activo
sudo systemctl status ssh

# En tu computadora HOST (no en la VM):
# Generar par de claves SSH (si no tienes)
ssh-keygen -t ed25519 -C "tu_email@example.com"
# O más compatible:
ssh-keygen -t rsa -b 4096 -C "tu_email@example.com"

# Presiona Enter para ubicación default
# Presiona Enter sin contraseña (o agrega si deseas)

# Ver claves generadas
ls ~/.ssh/

# Copiar clave pública a servidor (desde HOST):
ssh-copy-id -i ~/.ssh/id_rsa.pub alumno@[IP-VM]
# Ingresa contraseña una última vez

# Ahora conecta sin contraseña:
ssh alumno@[IP-VM]
# No debe pedir contraseña

# Ver claves autorizadas en servidor
cat ~/.ssh/authorized_keys

# Cambiar permisos de directorio SSH
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### Paso 4: Configuración SSH Segura (25 min)

```bash
# Editar configuración SSH (en la VM)
sudo nano /etc/ssh/sshd_config

# Cambios recomendados (cambiar líneas existentes):
# Port 22                      (cambiar a 2222 si deseas otro puerto)
# PermitRootLogin no           (nunca permitir root)
# PasswordAuthentication no    (solo claves, si ya configuraste)
# PubkeyAuthentication yes     (ya debe estar así)
# X11Forwarding no             (seguridad)
# MaxAuthTries 3               (limitar intentos)
# MaxSessions 5                (limitar sesiones)

# Validar configuración
sudo sshd -t

# Reiniciar SSH
sudo systemctl restart ssh

# Verificar que aún funciona
ssh alumno@[IP-VM]
```

### Paso 5: Firewall Básico (20 min)

```bash
# Ver estado de firewall
sudo ufw status

# Habilitar firewall (CUIDADO: configura SSH primero)
sudo ufw enable

# Permitir SSH (CRÍTICO antes de habilitar)
sudo ufw allow ssh
# O si cambiaste puerto:
# sudo ufw allow 2222/tcp

# Permitir HTTP y HTTPS
sudo ufw allow http
sudo ufw allow https
# O explícitamente:
# sudo ufw allow 80/tcp
# sudo ufw allow 443/tcp

# Denegar acceso específico
sudo ufw deny 23/tcp  # Deny Telnet

# Ver reglas
sudo ufw show added
sudo ufw status verbose

# Remover regla
sudo ufw delete allow http

# Deshabilitar firewall (solo para troubleshooting)
sudo ufw disable
```

### Paso 6: Herramientas de Diagnóstico (20 min)

```bash
# Ver puertos abiertos
ss -tlnp  # t=tcp, l=listening, n=numeric, p=program

# Versión antigua (netstat)
netstat -tlnp

# Ver conexiones establecidas
ss -tnp

# Escanear puertos en host remoto (desde HOST)
nmap [IP-VM]  # Si lo tienes instalado

# Ver conexiones DNS
dig @8.8.8.8 google.com

# Traceroute a host
traceroute google.com

# Ver latencia
ping -c 4 8.8.8.8

# Ver velocidad de descarga (test de velocidad)
speedtest-cli  # Primero instalar: sudo apt install speedtest-cli
```

## Ejercicios de Práctica Independiente

### Ejercicio A: Conexión SSH Segura (30 min)

1. Generar par SSH (si no lo hiciste)
2. Copiar clave pública a la VM
3. Conectar sin contraseña
4. Cambiar puerto SSH a 2222
5. Conectar nuevamente al puerto 2222
6. Deshabilitar autenticación por contraseña

### Ejercicio B: Configuración de Firewall (20 min)

1. Habilitar ufw firewall
2. Permitir SSH
3. Permitir HTTP y HTTPS
4. Verificar que SSH aún funciona
5. Ver todas las reglas activas
6. Denegar puerto 23 (Telnet)

### Ejercicio C: Diagnóstico de Red (20 min)

1. Ejecutar `ss -tlnp` y documentar puertos abiertos
2. Ejecutar `ip route show` y explicar salida
3. Hacer `dig` a un dominio y ver dirección IP
4. Usar `ping` a 3 hosts diferentes
5. Ejecutar `traceroute` a google.com

## Validación

Demuestra al instructor:

- [ ] Conexión SSH sin contraseña funciona
- [ ] Puerto SSH cambiado a puerto personalizado
- [ ] Firewall habilitado y funciona
- [ ] Puertos abiertos verificados con `ss -tlnp`
- [ ] Puedes explicar diferencia entre TCP y UDP

## Troubleshooting

| Problema | Solución |
|----------|----------|
| "Permission denied (publickey)" | Verificar permisos de ~/.ssh (700) y authorized_keys (600) |
| "ssh: command not found" | Instalar: sudo apt install openssh-client |
| "Connection refused" | SSH no está corriendo, verificar: sudo systemctl status ssh |
| "ssh_keyscan: connection refused" | Host está down o SSH no escucha en ese puerto |

## Conceptos Clave

**SSH Security:**
- **Port 22:** Default (cambiar en producción)
- **Public Key:** Compartible, identifica host
- **Private Key:** Secreto, debe ser seguro (chmod 600)
- **authorized_keys:** Claves públicas permitidas

**Firewall Básico:**
- UFW es fronted amigable de iptables
- SIEMPRE permitir SSH antes de habilitar firewall
- Reglas proceden de arriba a abajo

**Herramientas Red:**
- `ss` o `netstat`: Ver conexiones/puertos
- `ip`: Ver/configurar direcciones IP
- `ping`: Test ICMP (reachability)
- `dig`/`nslookup`: DNS queries

---

