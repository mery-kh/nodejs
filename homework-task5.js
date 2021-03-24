const fs = require('fs').promises;
const fsExtra = require('fs-extra')
async function moveFiles() {
 let files =  await  fs.readdir('Homework5');
  await fs.mkdir('newDir');
  for(let file of files){
      await fsExtra.copy('Homework5', 'newDir');
      let stats = await fs.stat('Homework5/'+file);
      if(stats.size<= 1){
          await fs.unlink('newDir/'+file);
      }
  }
}
moveFiles().then(function (){
    console.log('done')
}).catch((err) =>{
    console.log(err)
});

