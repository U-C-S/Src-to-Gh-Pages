const fs = require('fs');
const glob = require('glob');

let currentPath = __dirname;
let distDir = `${currentPath}\\dist`;
let jsonFile;

try {
  let file = fs.readFileSync('./srcgh.json');
  jsonFile = JSON.parse(file);
} catch (err) {
  console.error("ERROR: srcgh.json file not found in " + __dirname);
  console.log(err);
}

if(!jsonFile.include){
  jsonFile.include = ["src"];
}

srcOperations();

function srcOperations(){
  let srcPattern = jsonFile.include[0];
  let ignorePattern = jsonFile.exclude[0];

  let srcFiles = glob.sync(srcPattern, {nonull: false, ignore: ignorePattern});

  console.log(srcFiles);

  fs.mkdirSync(
    distDir, 
    { recursive: true },
    (err) => {if (err) throw err;}
  );  

  srcFiles.forEach(file => {
    if(file.includes('.')){
      fs.copyFile(file, dist(file),(err)=>{
        if(err) throw err;
      })
    }
  });



}

function dist(file){
  return file.replace('src','dist');
}

/*
if(fs.existsSync(jsonFile.src)){
  console.log('Path Exists');
  srcOperations();
}
else{
  throw "src path mentioned srcgh.json is not available";
} */