const random = require('random');
const http = require('http');
const fs = require('fs/promises');
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


// fs.readFile('./config.json').then(function( data){
//     http.createServer(function (req, res) {
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.write('Hello World!');
//         res.end();
//     }).listen(JSON.parse(data.toString()).port);
// });

// 3
// fs.readFile('./input.txt').then(function (data){
//     Promise.all([
//
//     ])
// })
async  function read(){
    const data = await fs.readFile('./input.txt','utf-8');
    const one = data.slice(0,data.length / 2);
    const two = data.slice(data.length / 2);
    await Promise.all([
        fs.writeFile('./output1.txt',one),
        fs.writeFile('./output2.txt',two)

])
}
read().then(function (){
    console.log('done');
}).catch((err) =>{
    console.log(err)
})
