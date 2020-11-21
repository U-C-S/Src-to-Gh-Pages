const fs = require('fs');
const path = require('path');
const log = require('./log');

let MainDir = __dirname;

function dirReader(src){
  let readDir = fs.readdirSync(src);
  let FileAdrsStore = new Array();
  let DirAdrsStore = new Array();

  readDir.forEach(address => {
    let AbPath =(!path.isAbsolute(src)) ? path.join(MainDir,src,address) : path.join(src,address);
    let AdrsStats = fs.statSync(AbPath);
    if(!AdrsStats.isDirectory()){
      FileAdrsStore.push(AbPath);
    }
    else{
      DirAdrsStore.push(AbPath);
    }
  });

  let retVal = {
    fileArray: FileAdrsStore,
    dirArray: DirAdrsStore
  }
  return retVal;
}

module.exports = dirReader