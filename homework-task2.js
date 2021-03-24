const http = require('http');
const fs = require('fs/promises');
fs.readFile('./config.json').then(function( data){
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Hello World!');
        res.end();
    }).listen(JSON.parse(data.toString()).port);
});
