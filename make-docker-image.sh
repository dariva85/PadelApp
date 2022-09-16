#!/bin/bash
set -e   # Si algun comando falla, salimos del script

# Instalar módulos en server
echo -n "Instalando módulos en servidor... "
cd backend/server
npm install >& /dev/null
cd ../..
echo "ok"

# Instalar módulos en frontend
echo -n "Instalando módulos en frontend... "
cd frontend
npm install >& /dev/null
cd ..
echo "ok"

# Compilar frontend
echo -n "Compilando frontend... "
cd frontend
npm run build >& /dev/null
cd ..
echo "ok"

# Compilar frontend
echo -n "Creando imagen Docker... "
docker build -t padelapp/server --force-rm . >& /dev/null
echo "ok"