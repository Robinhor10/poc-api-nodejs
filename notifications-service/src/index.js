const express = require('express');
const { sendNotification } = require('./notificationsHandler');

const app = express();
app.use(express.json());

app.post('/notify', sendNotification);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Notifications service listening on port ${PORT}`));
