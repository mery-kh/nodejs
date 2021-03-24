const fs = require('fs');
const {Readable,Writable,Duplex,Transform} = require('stream');
const fsPromise = require('fs/promises')
// 1
// const readStream = fs.createReadStream('./input.txt',{
//     highWaterMark:10
// });
// readStream.on('data',function (chunk){
//     chunk.toString().split(' ').forEach(word => {
//         if (!/[^a-zA-Z0-9]/.test(word)) {
//             console.log(word);
//         }
//     });
// });


// 2
// const readStream = fs.createReadStream('./input.txt',{
//     highWaterMark:1
// });
// const writeStream = fs.createWriteStream('./input11.txt');
// const transform = new Transform({
//     transform(chunk, encoding, next) {
//         this.push(chunk.toString().toUpperCase());
//         console.log(chunk.toString())
//         next();
//     }
// });
// readStream.pipe(transform).pipe(writeStream);


// 3
// class RemoveSpecialChars extends Transform{
//     constructor() {
//         super();
//     }
//     _transform(chunk, encoding, next) {
//         chunk.toString().split(' ').forEach(word => {
//             if (!/[^a-zA-Z0-9]/.test(word)) {
//                 this.push(word);
//             }
//         });
//         next();
//     }
// }
// const read = fs.createReadStream('./homeworkr.txt',{
//     highWaterMark:4
// });
// const write = fs.createWriteStream('./homeworkw.txt');
// const myStream = new RemoveSpecialChars();
// read.pipe(myStream).pipe(write);

// 4
// async function func(name){
//     let read = await fsPromise.readFile(name,'utf-8');
//     await fsPromise.writeFile(name,read.split(/ /g).map(word => `${word.substring(0,1).toUpperCase()}${word.substring(1)}`).join(" "));
// }
// func('input.txt').then(function (){
//     console.log('done');
// }).catch((err) =>{
//     console.log(err)
// });

