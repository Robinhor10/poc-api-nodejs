const AWS = require('aws-sdk');
const { Kafka } = require('kafkajs');

// Configura o AWS SDK com a região do ambiente
AWS.config.update({
    region: 'us-east-1',
    endpoint: 'http://localstack:4566',
    accessKeyId: 'test',  // Use credenciais fictícias para o LocalStack
    secretAccessKey: 'test'
  });
  
const dynamoDb = new AWS.DynamoDB.DocumentClient({ endpoint: process.env.DYNAMODB_ENDPOINT });

// Configuração do Kafka
const kafka = new Kafka({
    clientId: 'notifications-service',
    brokers: ['kafka:9092']
});

const consumer = kafka.consumer({ groupId: 'notifications-group' });

const sendNotification = async (paymentResult) => {
    // Lógica de envio de notificações
    console.log(`Sending notification for payment: ${paymentResult.idPayment} with status ${paymentResult.status}`);
    
    // Simulação de envio de notificação
    const notificationStatus = 'Sent';

    const notificationResult = {
        idNotification: paymentResult.idPayment + '_notification',
        idPayment: paymentResult.idPayment,
        status: notificationStatus,
        date: new Date().toISOString()
    };

    // Gravar o resultado da notificação no DynamoDB
    const params = {
        TableName: 'notifications',
        Item: notificationResult
    };

    await dynamoDb.put(params).promise();
    return notificationResult;
};

const run = async () => {
    await consumer.connect();

    await consumer.subscribe({ topic: 'pagamentoProcessado', fromBeginning: true });
    await consumer.subscribe({ topic: 'pagamentoFalhou', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const paymentResult = JSON.parse(message.value.toString());
            await sendNotification(paymentResult);
        }
    });
};

run().catch(console.error);