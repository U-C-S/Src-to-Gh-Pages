const fs = require("fs");
const log = require("./log");

function copier(data) {
  fs.mkdirSync("dist");
  data.dirArray.forEach((dir) => {
    let newDirPath = dir.replace("src", "dist");
    fs.mkdirSync(newDirPath);
  });

  data.fileArray.forEach((file) => {
    let newFilePath = file.replace("src", "dist");
    fs.copyFileSync(file, newFilePath);
  });

  log("Copied Files to dist Directory");
}

module.exports = copier;
