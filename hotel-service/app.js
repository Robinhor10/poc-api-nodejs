const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/reserve', async (req, res) => {
    const { reservationId } = req.body;

    try {
        const paymentResponse = await axios.post('http://payment-service:3001/pay', { reservationId });
        if (paymentResponse.status !== 200) {
            throw new Error('Falha no pagamento');
        }

        const notifyResponse = await axios.post('http://notification-service:3002/notify', { message: 'Reserva confirmada' });
        if (notifyResponse.status !== 200) {
            throw new Error('Falha ao notificar');
        }

        res.status(200).json({ status: 'Reserva confirmada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Falha na reserva', error: error.message });
    }
});

const port = 3000;
app.listen(port, () => console.log(`Service hotel executando na porta ${port}`));
