const express = require('express');
const AWS = require('aws-sdk');
const app = express();
app.use(express.json());

// As credenciais são automaticamente obtidas das variáveis de ambiente
AWS.config.update({
    endpoint: 'http://localstack:4566',
    region: process.env.AWS_REGION || 'us-east-1'
  });

// Configuração do DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.post('/pay', async (req, res) => {
    const { paymentId, orderId, amount } = req.body;
    const params = {
        TableName: 'Payments',
        Item: { paymentId, orderId, amount }
    };

    try {
        await dynamoDB.put(params).promise();
        res.json({ success: true, message: 'Pagamento Processado' });
    } catch (error) {
        console.error('Erro ao processar o pagamento:', error);
        res.status(500).json({ success: false, message: 'Falha ao processar o pagamento' });
    }
});

const port = 3001;
app.listen(port, () => console.log(`Service Payment executando na porta ${port}`));
