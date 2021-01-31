const path = require("path");
const fs = require("fs");

//-----DirReader----------------
let Addresses = { rootDir: "", fileArray: [], dirArray: [] };
let rootDir;
function dirReader(src) {
  let readDir = fs.readdirSync(src);

  readDir.forEach((address) => {
    let NewRelPath = path.join(src, address);
    let pathStats = fs.statSync(NewRelPath);

    if (pathStats.isDirectory()) {
      Addresses.dirArray.push(NewRelPath);
    } else {
      Addresses.fileArray.push(NewRelPath);
    }
  });
}

function ThePathsOf(entryDir, dirBindAddress) {
  entryDir = rootDir = Addresses.rootDir = path.join(dirBindAddress, entryDir);
  dirReader(entryDir);
  for (let i = 0; i < Addresses.dirArray.length; i++) {
    dirReader(Addresses.dirArray[i]);
  }

  return Addresses;
}

//----Copy the dir data to other-------------
function Copier(data, CopyTarget) {
  if (fs.existsSync(CopyTarget)) {
    fs.rmdirSync(CopyTarget, { recursive: true });
    fs.mkdirSync(CopyTarget);
  } else {
    fs.mkdirSync(CopyTarget);
  }

  try {
    data.dirArray.forEach((dir) => {
      let newDirPath = path.join(CopyTarget, dir);
      fs.mkdirSync(newDirPath);
    });
  } catch (error) {
    console.log(error);
  }

  data.fileArray.forEach((file) => {
    let newFilePath = path.join(CopyTarget, file);
    fs.copyFileSync(file, newFilePath);
  });

  log(`Copied Files to ${CopyTarget} Directory`);
}

module.exports = { ThePathsOf, Copier };
