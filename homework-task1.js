const fs = require('fs');
const {Readable,Writable,Duplex,Transform} = require('stream');
// 1
const readStream = fs.createReadStream('./input.txt',{
    encoding: 'utf-8',
    highWaterMark:10
});
readStream.on('data',function (chunk){
    // chunk.toString().split(' ').forEach(word => {
    //     if (!/[^a-zA-Z0-9]/.test(word)) {
    //         console.log(word);
    //     }
    // });
    console.log(chunk.replace(/[^a-zA-z0-9\n\s\t]/g, ''));
});
readStream.on('end',()=>{
    console.log('end')
})
