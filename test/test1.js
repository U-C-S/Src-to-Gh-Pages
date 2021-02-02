//This module is for Developmental Purposes
const fs = require("fs");
const { relative } = require("path");
const theDirReader = require("../dir");
//const { theDirReader } = require("../dir");
/*
const { ThePathsOf, Copier } = require("../dir");

let x = ThePathsOf("folderTest", __dirname);
fs.appendFileSync("DirData.json", JSON.stringify(x));
// let xx= relative(
//   "D:\\COde\\Web Dev\\Src-to-Gh-Pages\\tests\\folderTest",
//   "D:\\COde\\Web Dev\\Src-to-Gh-Pages\\tests\\folderTest\\cat\\kitty.txt"
// );
// console.log(xx);

Copier(x, "D:/TESTING/");
//let z = new fs.Dirent(__dirname);
//console.log(z.isDirectory());
*/

/*
####ToDO
- feature to excute other commands before the execution of this package
- feature to deploy the dist folder to Gh-pages
- srcgh.json

//Completed
- Function to copy the files to dist
- maybe add all the create a union of all similar items, like all files list in a single array and same for dirs
- Use better naming
*/

let x = new theDirReader("folderTest", __dirname);
fs.appendFileSync("DirData.json", JSON.stringify(x.Out));
