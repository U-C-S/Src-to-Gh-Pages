const fs = require("fs");
const path = require("path");
const log = require("./log");

function DirData(entryPoint) {
  let FileData = {};
  let main = dirReader(entryPoint);
  FileData[entryPoint] = main;

  let AllDirs = main.dirArray;
  for (let i = 0; i < AllDirs.length; i++) {
    const aDir = AllDirs[i];
    let dirFiles = dirReader(aDir);
    FileData[aDir] = dirFiles;
    AllDirs.push.apply(AllDirs, dirFiles.dirArray);
    log(AllDirs);
  }

  return FileData;
}

function dirReader(src) {
  let readDir = fs.readdirSync(src);
  let FileAdrsStore = new Array();
  let DirAdrsStore = new Array();

  readDir.forEach((address) => {
    let AbPath = path.join(src, address);
    let AdrsStats = fs.statSync(AbPath);
    if (!AdrsStats.isDirectory()) {
      FileAdrsStore.push(AbPath);
    } else {
      DirAdrsStore.push(AbPath);
    }
  });

  let retVal = {
    fileArray: FileAdrsStore,
    dirArray: DirAdrsStore,
  };
  return retVal;
}

module.exports = DirData;
