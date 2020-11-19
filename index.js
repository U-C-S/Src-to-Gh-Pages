const fs = require('fs');

//-----------------------------------
let currentPath = __dirname;
let distDir = `${currentPath}\\dist`;

fs.mkdir(
  distDir, 
  { recursive: true },
  (err) => {if (err) throw err;}
);

if(fs.existsSync('./src')){
  srcOperations();
}

function srcOperations(){
  console.log('Path Exists');
}