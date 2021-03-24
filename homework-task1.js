const os = require('os');
const fs = require('fs');
fs.writeFile(os.hostname()+'.txt', JSON.stringify(os.userInfo()),err =>{
    if(err){
        throw  err;
    }
});

