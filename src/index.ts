import * as program from 'commander'
import * as fs from 'fs-extra'
import Main from "./Main";

program
  .version(VERSION || '0.0.0')
  .option('-c, --config [path]', 'Your custom config file path, default: ./config.json')
  .option('-o, --output [java/objc/swift/ts/backend]', 'Generate java/objc/ts/backend code, default: java')
  .action((cmd, env) => {

  })
  .parse(process.argv)

let config = program.config || './config.json'
let output = program.output
if (!fs.existsSync(config)){
    throw new Error("config file doesn't exists!");
}
let configObj = JSON.parse(fs.readFileSync(config, 'utf8'))
let main = new Main(configObj)

switch (output) {
  case 'java': {
    main.java()
    break
  }
  case 'kotlin': {
    main.kotlin()
    break
  }
  case 'objc': {
    main.objc()
    break
  }
  case 'swift': {
    main.swift()
    break
  }
  case 'ts': {
    main.ts()
    break
  }
  case 'backend': {
    main.backend()
    break
  }
  default:{
    console.log(`using default output options`)
    main.verify()
    break
  }
}