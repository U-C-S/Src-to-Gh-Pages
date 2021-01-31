const path = require("path");
const {
  readdirSync,
  statSync,
  existsSync,
  rmdirSync,
  mkdirSync,
  copyFileSync,
} = require("fs");
const { throws } = require("assert");

//-----DirReader----------------
let Addresses = { fileArray: [], dirArray: [] };
function dirReader(src) {
  let readDir = readdirSync(src);

  readDir.forEach((address) => {
    let NewRelPath = path.join(src, address);
    let pathStats = statSync(NewRelPath);

    if (pathStats.isDirectory()) {
      Addresses.dirArray.push(NewRelPath);
    } else {
      Addresses.fileArray.push(NewRelPath);
    }
  });
}

function ThePathsOf(entryPoint) {
  dirReader(entryPoint);
  for (let i = 0; i < Addresses.dirArray.length; i++) {
    dirReader(Addresses.dirArray[i]);
  }

  return Addresses;
}

//----Copy the dir data to other-------------
function Copier(data, CopyTarget) {
  if (existsSync(CopyTarget)) {
    rmdirSync(CopyTarget, { recursive: true });
    mkdirSync(CopyTarget);
  } else {
    mkdirSync(CopyTarget);
  }

  try {
    data.dirArray.forEach((dir) => {
      let newDirPath = path.join(CopyTarget, dir);
      mkdirSync(newDirPath);
    });
  } 
  catch (error) {
    throw new Error("Boooo");
  }

  data.fileArray.forEach((file) => {
    let newFilePath = path.join(CopyTarget, file);
    copyFileSync(file, newFilePath);
  });

  log(`Copied Files to ${CopyTarget} Directory`);
}

module.exports = { ThePathsOf, Copier };
