#!/bin/bash

# -- > Create DynamoDb Table
echo \#\#\#\# Criando  DynamoDb \'Reservations\' table ... \#\#\#\#
echo $(awslocal dynamodb create-table --cli-input-json '{"TableName":"Reservations", "KeySchema":[{"AttributeName":"reservationId","KeyType":"HASH"},{"AttributeName":"reservationId","KeyType":"RANGE"}], "AttributeDefinitions":[{"AttributeName":"reservationId","AttributeType":"S"}],"BillingMode":"PAY_PER_REQUEST"}')

# -- > Create DynamoDb Table
echo \#\#\#\# Criando  DynamoDb \'Payments\' table ... \#\#\#\#
echo $(awslocal dynamodb create-table --cli-input-json '{"TableName":"Payments", "KeySchema":[{"AttributeName":"paymentId","KeyType":"HASH"},{"AttributeName":"paymentId","KeyType":"RANGE"}], "AttributeDefinitions":[{"AttributeName":"paymentId","AttributeType":"S"}],"BillingMode":"PAY_PER_REQUEST"}')

# -- > Create DynamoDb Table
echo \#\#\#\# Criando  DynamoDb \'Notifications\' table ... \#\#\#\#
echo $(awslocal dynamodb create-table --cli-input-json '{"TableName":"Notifications", "KeySchema":[{"AttributeName":"notificationId","KeyType":"HASH"},{"AttributeName":"notificationId","KeyType":"RANGE"}], "AttributeDefinitions":[{"AttributeName":"notificationId","AttributeType":"S"}],"BillingMode":"PAY_PER_REQUEST"}')

# --> List DynamoDb Tables
echo \#\#\#\# Listando tabelas ... \#\#\#\#
echo $(awslocal dynamodb list-tables)

# --> Inserindo registro
#echo \#\#\#\# Criando registro na tabela \#\#\#\#
#echo $(awslocal dynamodb put-item --table-name tb_riscos --item '{"id_cadastro": {"S": "1b42efe8-3a86-4ac2-9815-0a859223f35b"},"id_documento": {"S": "94278653000"},"id_documento": {"S": "94278653000"},"Nome": {"S": "Joao Aristos"},"Telefone": {"S": "912346546"},"Batizado": {"S": "true"},"Membro": {"S": "false"},"genero": {"S": "masculino"},"Endereco": {"S": "ruateste,123"},"bairro": {"S": "pq viana"},"cidade": {"S": "barueri"},"cep": {"S": "06439210"},"timestamp": {"S": "2022-11-07T23:16:42.307Z"}}')

#echo \#\#\#\# Verificando se o registro foi criado \#\#\#\#
#echo $(awslocal dynamodb scan --table-name tb_riscos)