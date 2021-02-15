const fs = require("fs");
const path = require("path");

let Addresses = {
  rootDir: "",
  dirArray: [],
  fileArray: [],
  dirFullPath: [],
  fileFullPath: [],
};

class theDirReader {
  constructor(entryDir, dirBindAddress) {
    this.entryDir = entryDir;
    this.dirBindAddress = dirBindAddress;
  }

  /**
   * get the output as a object that contains all the available paths in a dir
   */
  get Out() {
    let entryPath = (Addresses.rootDir = path.join(this.dirBindAddress, this.entryDir));
    this.dirReader(entryPath);
    for (let i = 0; i < Addresses.dirFullPath.length; i++) {
      this.dirReader(Addresses.dirFullPath[i]);
    }

    return Addresses;
  }

  /**
   * not for Use, outputs a 1 level of paths available in the specified dir
   * @param {string} src - source path
   */
  dirReader(src) {
    let readDir = fs.readdirSync(src);

    readDir.forEach((address) => {
      let fullPath = path.join(src, address);
      let relPath = path.relative(Addresses.rootDir, fullPath);
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

  /**
   * Used for Copying the files
   * @param {string} CopyTarget - specify the target where you want to copy the files
   */
  Copier(CopyTarget) {
    let SrcDirData = this.Out;
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
}

module.exports = theDirReader;
