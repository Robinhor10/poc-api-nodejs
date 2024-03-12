const AWS = require('aws-sdk');

// Configura o AWS SDK com a região do ambiente
AWS.config.update({
    region: 'us-east-1',
    endpoint: 'http://localstack:4566',
    accessKeyId: 'test',  // Use credenciais fictícias para o LocalStack
    secretAccessKey: 'test'
  });
  
const dynamoDb = new AWS.DynamoDB.DocumentClient({ endpoint: process.env.DYNAMODB_ENDPOINT });

exports.createReservation = async (req, res) => {
    const { idReservation, name, date, value } = req.body;
    const params = {
        TableName: 'reservations',
        Item: { idReservation, name, date, value, status: 'Reserved' },
    };

    try {
        await dynamoDb.put(params).promise();
        res.status(200).json({ message: 'Reservation created successfully' });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ message: 'Error creating reservation' });
    }
};
