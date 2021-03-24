const fs = require('fs/promises');
async  function read(){
    const data = await fs.readFile('./input.txt','utf-8');
    const one = data.slice(0,data.length / 2);
    const two = data.slice(data.length / 2);
    await Promise.all([
        fs.writeFile('./output1.txt',one),
        fs.writeFile('./output2.txt',two)

    ])
}
read().then(function (){
    console.log('done');
}).catch((err) =>{
    console.log(err)
})
