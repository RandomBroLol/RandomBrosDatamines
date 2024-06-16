const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));

let alertMessage = "This is an important alert message."; // default alert message

app.get('/alert', (req, res) => {
    res.json({ alertMessage });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/info.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'info.html'));
});

app.get('/secret.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'secret.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
