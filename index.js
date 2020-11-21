const fs = require('fs');
const dirReader = require('./dir');
const log = require('./log');

let x = retriveAllData('./src');

function retriveAllData(entryPoint){
  let FileData = {};
  let main = dirReader(entryPoint);
  FileData['main'] = main;

  if(main.dirArray != []){
    main.dirArray.forEach(folder => {
      let dirFiles = dirReader(folder);
      if(dirFiles)
        FileData[folder] = dirFiles;
    })
  }

  return FileData;
}


fs.appendFileSync('./DirData.json', JSON.stringify(x));
console.log('Data printed to DirData.json file in this directory');

/*
fs.stat(path.join(__dirname,'./src'),(err,stats)=>{
  console.log(stats.isDirectory());
})

console.log(path.join(__dirname,'./src','abcd.rs'));
*/

//node what.js