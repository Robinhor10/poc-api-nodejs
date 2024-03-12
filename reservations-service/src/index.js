const express = require('express');
const { createReservation } = require('./reservationsHandler');

const app = express();
app.use(express.json());

app.post('/reserve', createReservation);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Reservations service listening on port ${PORT}`));
