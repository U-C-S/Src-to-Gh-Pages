const fs = require('fs');
const dirReader = require('./dir');
const log = require('./log');


let FileData = {};
let x = retriveAllData('./src');

function retriveAllData(entryPoint){
  let main = dirReader(entryPoint);
  AddtoObject('main', main);

  if(main.dirArray != []){
    main.dirArray.forEach(folder => {
      let dirFiles = dirReader(folder);
      if(dirFiles) AddtoObject(folder , dirFiles);
    })
  }
}

function AddtoObject(name, content){
  FileData[name] = content;
}


fs.appendFileSync('./data.txt', JSON.stringify(FileData));
console.log('Data printed to data.txt file in this directory');

/*
fs.stat(path.join(__dirname,'./src'),(err,stats)=>{
  console.log(stats.isDirectory());
})

console.log(path.join(__dirname,'./src','abcd.rs'));
*/

//node what.js