const fs = require('fs');
const path = require('path');

let MainDir = __dirname;

function dirReader(src){
  let readDir = fs.readdirSync(src);
  let FileAdrsStore = new Array();
  let DirAdrsStore = new Array();

  readDir.forEach(address => {
    let AbPath = path.join(MainDir,src,address)
    fs.stat(AbPath,(err,AdrsStats) => {
      if(err){
        throw err;
      }
      else if(!AdrsStats.isDirectory()){
        FileAdrsStore.push(AbPath);
      }
      else{
        DirAdrsStore.push(AbPath);
      }
    })
  });

  let retVal = {
    fileArray: FileAdrsStore,
    dirArray: DirAdrsStore
  }
  console.log(retVal.dirArray);
  return retVal;
}

module.exports = dirReader