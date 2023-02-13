const express = require('express');
const fs = require('fs');
const server = express();
const cors = require('cors')
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json()); //. api
server.use(cors());
const conn = require('./connect');
server.use(express.static('public'));

require('./routers/home')(server);

server.listen(3000, function() {
    console.log('Server listening on port  http://localhost:3000');
})