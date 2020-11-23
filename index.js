#!/usr/bin/env node

const process = require("process");
const ThePathsOf = require("./dir");
const log = require("./log");
const copier = require("./copy");

const arg = process.argv[2];
let srcFolder = !arg ? "src" : arg;
let x = ThePathsOf(srcFolder);

log("This is app is currently in Beta. Not All features included");
log("-- What this package can do now?");
log(
  "-- This package can read all the files in your specified folder and Copy them to the dist directory"
);

//fs.appendFileSync("DirData.json", JSON.stringify(x));
copier(x);
