// const fs = require('fs');
// const os = require('os');
// const  random = require('random');

// 1
// console.log(os.totalmem()/1024 +' kb');

// 2
// console.log(os.networkInterfaces().lo[0].address);

// 3
// let num = '';
// for (let i = 0; i<8; i++){
//     let count = random.int((min = 0), (max = 9));
//     count = count.toString();
//     num += count;
// }
// console.log(num)
// let cpuCount = os.cpus().length;
// cpuCount = cpuCount.toString()
// fs.writeFile(num+'.txt' ,cpuCount ,()=>{
//     console.log('done');
// })

// 4
// fs.readFile('input.txt',function (err, data){
//     if(err){
//         return err.message;
//     }
//     data = data.toString();
//     let str = data.replace(/ /g, "-");
//     fs.writeFile('write.txt',str, ()=>{
//         console.log('written')
//     })
// });

// 5
// let homework2 = fs.readFileSync('homework2.js');
// let homework3 = fs.readFileSync('homework3.js');
// let homework4 = fs.readFileSync('homework4.js');
// let homework5 = fs.readFileSync('homework5.js');
// let homeworks = homework2 + ' ' + homework3 + ' ' + homework4 + ' ' + homework5;
// let time = new Date().getHours() + "_" + new Date().getMinutes() + "_" + new Date().getSeconds();
// let name = os.platform()+'_'+ time;
// fs.writeFile(name+'.txt',homeworks,()=>{
//     console.log('done');
// });

