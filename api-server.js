// API server
const express = require('express');
const app = express();

app.get('/api/text', (req, res) => {
    res.send({ text: 'This is from the API server!' });
});

app.get('/api/text/jsonp', (req, res) => {
    const callback = req.query.callback;

    if (callback) {
        res.set('Content-Type', 'text/javascript');
        res.send(`
            ${callback}({ text: "This is data from the backend! Thanks JSONP! 👍" });
        `);
        return;    
    }

    res.send('Callback function is required.');
});

app.get('/api/text/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*'); 
    res.send({ text: 'This is data from the backend! Thanks CORS! 👍' });
});

app.listen(8000, () => {
    console.log('Server listening on 8000');
})