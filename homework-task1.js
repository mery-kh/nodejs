const random = require('random');
const fs = require('fs/promises');
const promise = new Promise(function (resolve,reject){
    let num = random.int((min = 0),(max = 10));
    if(num<5){
        reject(new Error('Error!'));
    }
    else{
        resolve(num);
    }
}).then(function (data){
    console.log(data);
}).catch(function (err){
    console.log(err)
});
