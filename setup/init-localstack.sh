#!/bin/bash

echo "Aguardando LocalStack estar pronto..."

# Aguarde até que o LocalStack esteja pronto
while ! nc -z localstack 4566; do
  sleep 1
done

echo "LocalStack está pronto. Iniciando configuração do DynamoDB..."

# Execute o script de setup do Node.js
node /docker-entrypoint-initaws.d/setup.js
