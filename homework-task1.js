const http = require('http');
http.createServer( function (req, res) {
    if (req.url === '/sunny'){
        console.log('Yes')
    }
}).listen(3000);
