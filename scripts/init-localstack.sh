#!/bin/bash

echo "Waiting for LocalStack to start..."
while ! nc -z localstack 4566; do
  sleep 1
done
echo "LocalStack started"

# Criação de tabelas
aws dynamodb create-table --table-name reservations \
    --attribute-definitions AttributeName=idReservation,AttributeType=S \
    --key-schema AttributeName=idReservation,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --endpoint-url http://localhost:4566

aws dynamodb create-table --table-name payments \
    --attribute-definitions AttributeName=idPayment,AttributeType=S \
    --key-schema AttributeName=idPayment,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --endpoint-url http://localhost:4566

aws dynamodb create-table --table-name notifications \
    --attribute-definitions AttributeName=idNotification,AttributeType=S \
    --key-schema AttributeName=idNotification,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --endpoint-url http://localhost:4566

echo "DynamoDB tables created"
