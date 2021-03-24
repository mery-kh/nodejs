const fs = require('fs');
const {Readable,Writable,Duplex,Transform} = require('stream');
class RemoveSpecialChars extends Transform{
    constructor() {
        super();
    }
    _transform(chunk, encoding, next) {
        chunk.toString().split(' ').forEach(word => {
            if (!/[^a-zA-Z0-9]/.test(word)) {
                this.push(word);
            }
        });
        next();
    }
}
const read = fs.createReadStream('./homeworkr.txt',{
    highWaterMark:4
});
const write = fs.createWriteStream('./homeworkw.txt');
const myStream = new RemoveSpecialChars();
read.pipe(myStream).pipe(write);
