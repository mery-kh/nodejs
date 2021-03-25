const http = require('http');
const url = require('url');
const  fs = require('fs');
const stream = require('stream')
// Create a server
http.createServer( function (req, res) {
    const urlData = url.parse(req.url, true);
    if(urlData.query.file &&  urlData.query.file === 'sunny.txt') {
        fs.createReadStream(urlData.query.file,{encoding:'utf-8', highWaterMark:1}).on('data',(chunk => {
            res.write(chunk);
        }))
    }
    else {
        res.statusCode = 404;
    }
    res.end();
}).listen(3000);
