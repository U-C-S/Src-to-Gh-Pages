const fs = require("fs");
const path = require("path");

//-----DirReader----------------
let Addresses = {
  rootDir: "",
  dirArray: [],
  fileArray: [],
  dirFullPath: [],
  fileFullPath: [],
};
let rootDir;
function dirReader(src) {
  let readDir = fs.readdirSync(src);

  readDir.forEach((address) => {
    let fullPath = path.join(src, address);
    let relPath = path.relative(rootDir, fullPath);
    let pathStats = fs.statSync(fullPath);

    if (pathStats.isDirectory()) {
      Addresses.dirArray.push(relPath);
      Addresses.dirFullPath.push(fullPath);
    } else {
      Addresses.fileArray.push(relPath);
      Addresses.fileFullPath.push(fullPath);
    }
  });
}

function ThePathsOf(entryDir, dirBindAddress) {
  entryDir = rootDir = Addresses.rootDir = path.join(dirBindAddress, entryDir);
  dirReader(entryDir);
  for (let i = 0; i < Addresses.dirFullPath.length; i++) {
    dirReader(Addresses.dirFullPath[i]);
  }

  return Addresses;
}

//----Copy the dir data to other-------------
function Copier(SrcDirData, CopyTarget) {
  if (fs.existsSync(CopyTarget)) {
    fs.rmdirSync(CopyTarget, { recursive: true });
    fs.mkdirSync(CopyTarget);
  } else {
    fs.mkdirSync(CopyTarget);
  }

  SrcDirData.dirArray.forEach((dir) => {
    let destFullPath = path.join(CopyTarget, dir);
    fs.mkdirSync(destFullPath);
  });

  SrcDirData.fileArray.forEach((file) => {
    let destFullPath = path.join(CopyTarget, file);
    let srcFilePath = path.join(SrcDirData.rootDir, file);
    fs.copyFileSync(srcFilePath, destFullPath);
  });

  console.log(`Copied Files to ${CopyTarget} Directory`);
}

module.exports = { ThePathsOf, Copier };
