const http = require('http');
http.createServer( function (req, res) {
    if (req.url === '/sunny'){
        console.log('Yes')
    }
    res.end('test')
}).listen(3000);
