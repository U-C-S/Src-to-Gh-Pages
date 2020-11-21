const dirReader = require('./dir');

let FileData = new Object();
let x = retriveAllData('./src');

function retriveAllData(entryPoint){
  let main = dirReader(entryPoint);
  console.log(main.fileArray);
  AddtoObject('main',main);

  if(main.dirArray != []){
    main.dirArray.forEach(folder => {
      AddtoObject(folder , dirReader(folder));
    })
  }
}

function AddtoObject(name, content){
  FileData[name] = content;
}



console.log(x);
setTimeout(()=>console.log(x), 3000);

/*
fs.stat(path.join(__dirname,'./src'),(err,stats)=>{
  console.log(stats.isDirectory());
})

console.log(path.join(__dirname,'./src','abcd.rs'));
*/

//node what.js