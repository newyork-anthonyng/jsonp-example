// Client server
const express = require('express');
const app = express();
const path = require('path');

app.get('/without-jsonp', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'without-jsonp.html'));
});

app.get('/with-jsonp', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'with-jsonp.html'));
});

app.get('/with-cors', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'with-cors.html'));
});

app.listen(3000, () => {
    console.log('Server listening on 8000');
})