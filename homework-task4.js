const fs = require('fs');
const web=['html','css','js','txt'];

fs.mkdir('web',err=>{
    if (err){
        throw err;
    }
})
for(let val of web){
    fs.writeFile('web/'+val+'.'+val,val,err=>{
        if(err){
            throw err;
        }
    });
}
