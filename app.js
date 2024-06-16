const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));

let alertMessage = "This is an important alert message."; // default alert message

app.get('/alert', (req, res) => {
    res.json({ alertMessage });
});

// Serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware to handle all other HTML requests
app.use((req, res, next) => {
    const filePath = path.join(__dirname, 'public', req.path);
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // File doesn't exist or not a regular file (e.g., directory)
            res.status(404).redirect('/404.html');
        } else {
            // Serve the requested HTML file
            res.sendFile(filePath);
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
