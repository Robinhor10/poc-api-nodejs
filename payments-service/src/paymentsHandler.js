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
    clientId: 'payments-service',
    brokers: ['kafka:9092']
});

const consumer = kafka.consumer({ groupId: 'payments-group' });
const producer = kafka.producer();

const processPayment = async (reservation) => {
    // Simulação do processamento de pagamento
    console.log(`Processing payment for reservation: ${reservation.idReservation}`);
    const paymentSuccess = Math.random() > 0.5; // Simulação de sucesso ou falha no pagamento

    const paymentResult = {
        idPayment: reservation.idReservation + '_payment',
        idReservation: reservation.idReservation,
        value: reservation.value,
        status: paymentSuccess ? 'Processed' : 'Failed',
        date: new Date().toISOString()
    };

    // Gravar o resultado do pagamento no DynamoDB
    const params = {
        TableName: 'payments',
        Item: paymentResult
    };

    await dynamoDb.put(params).promise();
    return paymentResult;
};

const run = async () => {
    await consumer.connect();
    await producer.connect();

    await consumer.subscribe({ topic: 'reservaCriada', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const reservation = JSON.parse(message.value.toString());
            const paymentResult = await processPayment(reservation);

            const topicToPublish = paymentResult.status === 'Processed' ? 'pagamentoProcessado' : 'pagamentoFalhou';

            await producer.send({
                topic: topicToPublish,
                messages: [{ value: JSON.stringify(paymentResult) }]
            });
        }
    });
};

run().catch(console.error);