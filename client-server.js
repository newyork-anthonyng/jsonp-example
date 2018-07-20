// Client server
const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

app.get('/without-jsonp', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'without-jsonp.html'));
});

app.get('/with-jsonp', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'with-jsonp.html'));
});

app.get('/with-cors', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'with-cors.html'));
});

app.get('/with-proxy', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'with-proxy.html'));
});

app.get('/proxy/api', (req, res) => {
    axios.get('http://localhost:8000/api/text')
        .then((response) => {
            res.send(response.data);
        });
});

app.listen(3000, () => {
    console.log('Server listening on 8000');
})