const express = require('express');
const { processPayment } = require('./paymentsHandler');

const app = express();
app.use(express.json());

app.post('/pay', processPayment);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Payments service listening on port ${PORT}`));
