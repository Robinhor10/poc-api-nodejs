const AWS = require('aws-sdk');

// Configura o AWS SDK com a região do ambiente
AWS.config.update({
    region: 'us-east-1',
    endpoint: 'http://localstack:4566',
    accessKeyId: 'test',  // Use credenciais fictícias para o LocalStack
    secretAccessKey: 'test'
  });
  
const dynamoDb = new AWS.DynamoDB.DocumentClient({ endpoint: process.env.DYNAMODB_ENDPOINT });

exports.processPayment = async (req, res) => {
    const { idReservation, idPayment, value } = req.body;
    const paymentStatus = 'Processed'; // Simulate payment process
    const params = {
        TableName: 'payments',
        Item: { idReservation, idPayment, value, date: new Date().toISOString(), status: paymentStatus },
    };

    try {
        await dynamoDb.put(params).promise();
        res.status(200).json({ message: 'Payment processed successfully' });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ message: 'Error processing payment' });
    }
};
