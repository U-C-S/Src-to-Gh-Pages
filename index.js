#!/usr/bin/env node

const process = require("process");
const ThePathsOf = require("./dir").default;
const log = require("./tests/src/log.js").default;
const copier = require("./copy").default;

const arg = process.argv;
let srcFolder = arg[2];
console.log(srcFolder);
//let x = ThePathsOf(srcFolder);

log("This is app is currently in Beta. Not All features included");
log("-- What this package can do now?");
log(
  "-- This package can read all the files in your specified folder and Copy them to the dist directory"
);

//fs.appendFileSync("DirData.json", JSON.stringify(x));
//copier(x);
