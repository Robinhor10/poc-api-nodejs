# Projeto de Microserviços com Docker e LocalStack

## Escopo do Projeto

Este projeto simula um sistema de reserva de hotel, processamento de pagamento e notificação, utilizando microserviços em Node.js. Cada componente é isolado, comunicando-se através de APIs, e integra-se com o DynamoDB no LocalStack para simulação do ambiente AWS localmente.

## Serviços

- **Hotel Service**: Gerencia reservas de hotel, registrando-as no DynamoDB.
- **Payment Service**: Processa pagamentos e atualiza o status no DynamoDB.
- **Notification Service**: Envia notificações baseadas no status das operações de reserva e pagamento.

## Como Executar

1. **Iniciar o LocalStack**: Execute `docker-compose up localstack` para iniciar o LocalStack.
2. **Configurar o DynamoDB**: Rode `node setup.js` para criar as tabelas no DynamoDB simulado pelo LocalStack.
3. **Construir e rodar os serviços**: Use `docker-compose up --build` para construir e iniciar os serviços de hotel, pagamento e notificação.
4. **Testar os endpoints**: Use uma ferramenta como Postman ou Insomnia para enviar requisições HTTP aos endpoints expostos pelos serviços.

Certifique-se de ter o Docker e o Docker Compose instalados em seu ambiente antes de executar os passos acima.