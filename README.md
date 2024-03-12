# Projeto de Microserviços com Docker e LocalStack

## Escopo do Projeto

Este projeto simula um sistema de reserva de hotel, processamento de pagamento e notificação, utilizando microserviços em Node.js. Cada componente é isolado, comunicando-se através de APIs, e integra-se com o DynamoDB no LocalStack para simulação do ambiente AWS localmente.

## Serviços

- **reservations-service**: Gerencia reservas de hotel, registrando-as no DynamoDB.
- **payments-service**: Processa pagamentos e atualiza o status no DynamoDB.
- **Notifications-Service**: Envia notificações baseadas no status das operações de reserva e pagamento.

## Como Executar

1. **Iniciar o LocalStack**: Execute `docker-compose up --build` para iniciar o LocalStack.
2. **Configurar o DynamoDB**:  para criar as tabelas no DynamoDB simulado pelo LocalStack.
    2.1 - Acesse via console do docker o container `localstack-1` e navegue até a opção `EXEC`
    2.2 - Estando na opção do terminal aberto, digite  `aws configure` a cada opção solicitada digite conforme os parametros do exemplo a seguir:
        AWS Access Key ID [None]: test
        AWS Secret Access Key [None]: test
        Default region name [None]: us-east-1
        Default output format [None]: json
    2.3 - Para a tabela `reservations`, digite o comando conforme abaixo para criar a tabela:
aws --endpoint-url=http://localhost:4566 dynamodb create-table \
    --table-name reservations \
    --attribute-definitions AttributeName=idReservation,AttributeType=S \
    --key-schema AttributeName=idReservation,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST

    2.4 - Para a tabela `payments`, digite o comando conforme abaixo para criar a tabela:
aws --endpoint-url=http://localhost:4566 dynamodb create-table \
    --table-name payments \
    --attribute-definitions AttributeName=idPayment,AttributeType=S \
    --key-schema AttributeName=idPayment,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST

    2.5 - Para a tabela `notifications `, digite o comando conforme abaixo para criar a tabela:
aws --endpoint-url=http://localhost:4566 dynamodb create-table \
    --table-name notifications \
    --attribute-definitions AttributeName=idNotification,AttributeType=S \
    --key-schema AttributeName=idNotification,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST

    2.6 - Para validar se as tabelas foram criadas, digite o comando abaixo no terminal dentro do container `localstack-1`
aws --endpoint-url=http://localhost:4566 dynamodb list-tables

3. **Construir e rodar os serviços**: Use `docker-compose up --build` para construir e iniciar os serviços de hotel, pagamento e notificação.
4. **Testar os endpoints**: Use uma ferramenta como Postman ou Insomnia para enviar requisições HTTP aos endpoints expostos pelos serviços.

Para testar a API usando o Insomnia, siga estes passos:

1. **Instale e Abra o Insomnia**: Se ainda não o fez, baixe e instale o Insomnia a partir do [site oficial](https://insomnia.rest/download).

### Opção 1 ###
# * Importando a collection *

1. Faça o download do arquivo `Insomnia_poc-sqs` que se encontra na estrutura de pastas \poc-api-nodes\collections
2. Abra a ferramenta Insomnia
3. No menu superior clique em `Application`
4. Depois clique em `Preferences`, no menu cliquem em `Data`
5. E por fim clique em `Import`, e escolha o arquivo baixado na etapa um deste processo


```

3. **Envie o Request**:
   - Clique no botão "Send" para enviar o request.
   - Se tudo estiver configurado corretamente, você receberá uma resposta indicando que a mensagem foi enviada com sucesso


Certifique-se de ter o Docker e o Docker Compose instalados em seu ambiente antes de executar os passos acima.