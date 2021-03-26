const users = require('./users.json');
const http = require('http');
const url = require('url');
http.createServer((req, res) => {
    const urlData = url.parse(req.url, true);
    const filter = urlData.query.filter;
    if (filter){
        res.end(JSON.stringify(users.filter(user=> {
            return user['first_name'].includes(filter) || user['last_name'].includes(filter);
        })));
    }
    else {
        res.end(JSON.stringify(users));
    }
}).listen(3000);
