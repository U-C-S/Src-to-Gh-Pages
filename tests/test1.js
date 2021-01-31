//This module is for Developmental Purposes
const fs = require("fs");
const { ThePathsOf, Copier } = require("../dir");

let x = ThePathsOf("tests/folderTest");
fs.appendFileSync("DirData.json", JSON.stringify(x));

Copier(x, "D:/TESTING/");

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
