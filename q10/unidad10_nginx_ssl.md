<section style="background: transparent; font-family: 'Fira Code', monospace; padding: 20px 0; border-bottom: 1px solid #eee;">
    <h2 style="color: #1b1f23;">📘 Unidad 10: Nginx y SSL</h2>
    
    <div style="margin-bottom: 15px; color: #333;">
        <strong>🎯 Objetivo:</strong> Configurar Nginx como servidor web y reverse proxy con SSL/TLS para producción segura.
    </div>

    <div style="margin-bottom: 20px; padding: 10px; border-left: 4px solid #9acd32; background: rgba(154, 205, 50, 0.05);">
        <strong>📚 Contenido Teórico (5 archivos):</strong>
        <ul style="margin: 5px 0; padding-left: 20px; font-size: 14px; color: #222;">
            <li><strong>10.1:</strong> Introducción a Nginx — arquitectura asíncrona, event loop, vs Apache.</li>
            <li><strong>10.2:</strong> Reverse Proxy — proxy_pass, load balancing, headers.</li>
            <li><strong>10.3:</strong> SSL con Certbot — HTTPS, Let's Encrypt, certificados self-signed.</li>
            <li><strong>10.4:</strong> Hardening y security headers — HSTS, CSP, X-Frame-Options, X-Content-Type.</li>
            <li><strong>10.5:</strong> Lab práctico — Reverse proxy + TLS con evidencias.</li>
        </ul>
    </div>

    <div style="margin-bottom: 20px; padding: 10px; border-left: 4px solid #ff9800; background: rgba(255, 152, 0, 0.05);">
        <strong>⏱️ Tiempo Estimado:</strong> 4 horas teóricas + 2.5 horas práctica (Lab 8)
        <br><strong>📊 Nivel:</strong> Intermedio
    </div>

    <div style="background: rgba(0,0,0,0.03); padding: 20px; border-radius: 8px; color: #444;">
        <strong>⚖️ Rúbrica de Evaluación:</strong>
        <ul style="margin: 10px 0; padding-left: 20px; list-style-type: square;">
            <li><strong>25% Reverse Proxy:</strong> proxy_pass configurado correctamente hacia servicio backend.</li>
            <li><strong>25% SSL/TLS:</strong> HTTPS funcional con certificado válido (Certbot o self-signed).</li>
            <li><strong>25% Security Headers:</strong> HSTS, X-Frame-Options, CSP configurados.</li>
            <li><strong>25% Lab 8:</strong> Reverse proxy + TLS funcional con evidencias y headers verificados.</li>
        </ul>
        <em>"Nginx + SSL es el estándar de la web moderna. Dominarlo es indispensable."</em>
    </div>
</section>
