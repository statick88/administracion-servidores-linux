#!/bin/bash

# Script para iniciar servidor local de Quarto
# Uso: ./start-server.sh

PROJECT_DIR="/Users/statick/apps/servers"
DOCS_DIR="$PROJECT_DIR/docs"
PORT=8000

echo "🚀 Iniciando servidor HTTP para Quarto..."
echo "📍 Directorio: $DOCS_DIR"
echo "🔗 URL: http://localhost:$PORT"
echo ""
echo "Para detener: Presiona Ctrl+C"
echo "Para abrir en navegador: open http://localhost:$PORT"
echo ""

cd "$DOCS_DIR"
python3 -m http.server $PORT
