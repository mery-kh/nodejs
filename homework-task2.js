const fs = require('fs');
const date = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0];
fs.rename('mery.txt',date+'.txt', err =>{
    if(err){
        throw err;
    }
})
