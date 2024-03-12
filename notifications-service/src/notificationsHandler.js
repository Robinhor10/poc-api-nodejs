const AWS = require('aws-sdk');

// Configura o AWS SDK com a região do ambiente
AWS.config.update({
    region: 'us-east-1',
    endpoint: 'http://localstack:4566',
    accessKeyId: 'test',  // Use credenciais fictícias para o LocalStack
    secretAccessKey: 'test'
  });
  
const dynamoDb = new AWS.DynamoDB.DocumentClient({ endpoint: process.env.DYNAMODB_ENDPOINT });

exports.sendNotification = async (req, res) => {
    const { idNotification, idReservation } = req.body;
    const notificationStatus = 'Sent'; // Simulate notification sending
    const params = {
        TableName: 'notifications',
        Item: { idNotification, idReservation, dateNotification: new Date().toISOString(), status: notificationStatus },
    };

    try {
        await dynamoDb.put(params).promise();
        res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ message: 'Error sending notification' });
    }
};
