const fs = require("fs");
const path = require("path");

let Addresses = { fileArray: [], dirArray: [] };

function ThePathsOf(entryPoint) {
  dirReader(entryPoint);
  for (let i = 0; i < Addresses.dirArray.length; i++) {
    dirReader(Addresses.dirArray[i]);
  }

  return Addresses;
}

function dirReader(src) {
  let readDir = fs.readdirSync(src);

  readDir.forEach((address) => {
    let NewRelPath = path.join(src, address);
    let pathStats = fs.statSync(NewRelPath);

    if (!pathStats.isDirectory()) {
      Addresses.fileArray.push(NewRelPath);
    } else {
      Addresses.dirArray.push(NewRelPath);
    }
  });
}

module.exports = ThePathsOf;
