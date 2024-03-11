const express = require('express');
const app = express();
app.use(express.json());

app.post('/notify', (req, res) => {
    const { notificationId, message } = req.body;
    try {
        // Aqui você pode adicionar a lógica para enviar a notificação
        console.log(`Notificação enviada para ${notificationId}: ${message}`);
        res.json({ success: true, message: 'Notificacao enviada com sucesso' });
    } catch (error) {
        console.error('Erro ao enviar notificação:', error);
        res.status(500).json({ success: false, message: 'Falha ao enviar a notificacao' });
    }
});

const port = 3002;
app.listen(port, () => console.log(`Service Notification executando na porta ${port}`));
