const fsPromise = require('fs/promises')
async function func(name){
    let read = await fsPromise.readFile(name,'utf-8');
    await fsPromise.writeFile(name,read.split(/ /g).map(word => `${word.substring(0,1).toUpperCase()}${word.substring(1)}`).join(" "));
}
func('input.txt').then(function (){
    console.log('done');
}).catch((err) =>{
    console.log(err)
});
