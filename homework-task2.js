const fs = require('fs');
const {Readable,Writable,Duplex,Transform} = require('stream');
const config = {
    a: 'ա',
    b: 'բ',
    c: 'ց',
    g :'գ',
    f: 'ֆ',
    e: 'ե'
};
const readStream = fs.createReadStream('./homework4Eng.txt',{
    encoding: 'utf-8',
    highWaterMark:1
});
const writeStream = fs.createWriteStream('./homework4Arm.txt');
// readStream.on('data', chunk => {
//     writeStream.write(config[chunk] || chunk)
// })
const transform = new Transform({
    transform(chunk, encoding, next) {
        this.push(config[chunk] || chunk);
        next();
    }
});
readStream.pipe(transform).pipe(writeStream);
