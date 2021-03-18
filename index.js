const random = require('random');
const http = require('http');
const fs = require('fs');
// 1
// const promise = new Promise(function (resolve,reject){
//     let num = random.int((min = 0),(max = 10));
//     if(num<5){
//         reject(new Error('Error!'));
//     }
//     else{
//         resolve(num);
//     }
// }).then(function (data){
//     console.log(data);
// }).catch(function (err){
//     console.log(err)
// });

// 2
// fs.readFile('./config.json',function(err, data){
//     http.createServer(function (req, res) {
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.write('Hello World!');
//         res.end();
//     }).listen(JSON.parse(data.toString()).port);
// });

// 3
fs.readFile('./input.txt',function(err, data){

});
Promise.all([
    readFile('./input.txt'),
    readFile('./input45.txt')
]).then(function (data) {
    return Promise.all([
        writeFile('write.txt', data[0].toString().replace(/\s+/g, '-')),
        writeFile('write2.txt', data[1].toString().replace(/\s+/g, '-'))
    ])
}).then(function () {
    console.log('done');
}).catch(function (err) {
    console.log(err);
});
