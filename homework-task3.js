const fs = require('fs').promises;

async function replaceFunc(){
    let read =  await  fs.readFile('homework3.txt', 'utf-8');
    await fs.writeFile('replace.txt', read.replace(/[,]/g,''));
    await fs.unlink('homework3.txt');
}
replaceFunc().then(function (){

    console.log('done');
}).catch((err) =>{
    console.log(err)
});
