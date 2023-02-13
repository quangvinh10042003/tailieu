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
// nếu cần
const ejs = require('ejs');
server.set('view engine', 'html');
server.engine('html', ejs.renderFile);


require('./routers/home')(server);
// nếu làm bằng view engine
// module.exports = function(server) {
//     server.get('/admin', function(req, res) {
//         res.render('admin/index')
//     });
// }
server.listen(3000, function() {
    console.log('Server listening on port  http://localhost:3000');
})