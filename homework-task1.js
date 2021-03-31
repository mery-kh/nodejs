const {EventEmitter} = require('events');
const fs = require('fs');
const emitter = new EventEmitter();
emitter.on('homework',(path)=>{
    fs.readFile(path,'utf-8', (err,data)=>{
        console.log(data)
    })
});
emitter.emit('homework','homework.txt')
