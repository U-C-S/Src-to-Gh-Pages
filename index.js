#!/usr/bin/env node

const fs = require("fs");
const process = require("process");
const DirData = require("./dir");
const log = require("./log");

const arg = process.argv[2];
let srcFolder = !arg ? "src" : arg;
let x = DirData(srcFolder);

log("This is app is currently in Beta. Not All features included");
log("-- What this package can do now?");
log("-- This package can read all the files in your specified folder and output them as a JSON file.");
setTimeout(() => {
  fs.appendFileSync("DirData.json", JSON.stringify(x));
  log("Data printed to DirData.json file in this directory");
}, 1000);
