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

const kafka = new Kafka({
    clientId: 'reservations-service',
    brokers: ['kafka:9092'] // Substitua pelo seu endereço do Kafka
  });
  const producer = kafka.producer();

  const createReservation = async (req, res) => {
    const { idReservation, name, date, value } = req.body;
    const reservation = { idReservation, name, date, value, status: 'Reserved' };
  
    // Grava no DynamoDB
    const params = {
      TableName: 'reservations',
      Item: reservation,
    };
  
    try {
      await dynamoDb.put(params).promise();
      await producer.connect();
      await producer.send({
        topic: 'reservaCriada',
        messages: [{ value: JSON.stringify(reservation) }],
      });
      res.status(200).json({ message: 'Reservation created and event published' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error creating reservation' });
    }
  };
  
  exports.createReservation = createReservation;