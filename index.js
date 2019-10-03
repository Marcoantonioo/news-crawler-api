const express = require('express');
const routes = require('./routes');
const server = express();
const PORT = process.env.PORT || 3000;

server.get('/', function (request, response) {
    const messageToSend = {
        message: 'Welcome my Friend'
    }
    response.status(200).send(messageToSend)
});

server.use('/news', routes);

server.listen(PORT, function () {
    console.log(`[server] running on  ${PORT}`);
});