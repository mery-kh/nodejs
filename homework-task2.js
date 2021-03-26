const http = require('http');
const url = require('url');
const  fs = require('fs');
const stream = require('stream')
http.createServer((req, res) => {
    const urlData = url.parse(req.url, true);
    if (urlData.query.file &&  urlData.query.file === 'sunny.txt'){
        fs.createReadStream('./sunny.txt').pipe(res);
    } else {
        res.statusCode = 404;
        res.end('File NOt Found');
    }
}).listen(3000);
