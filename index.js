const fs = require('fs');
var glob = require('glob');

//-----------------------------------
let currentPath = __dirname;
let distDir = `${currentPath}\\dist`;
let srcPattern = "{./src/*,./src/*/*}";

fs.mkdir(
  distDir, 
  { recursive: true },
  (err) => {if (err) throw err;}
);

if(fs.existsSync('./src')){
  srcOperations();
}

function srcOperations(){
  let srcFiles;
  console.log('Path Exists');

  glob(srcPattern, {nonull: false}, (err,files)=>{
    if (err) throw err;
    console.log(files);
    srcFiles = files;
  });

  // fs.copyFile("./src/index.html","./dist/index.html",(err)=>{
  //   if(err) throw err;
  //   console.log('copied');
  // })
}