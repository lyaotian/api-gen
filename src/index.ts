import * as program from 'commander'
import * as fs from 'fs-extra'
import Main from "./Main";

program
  .version('0.0.1')
  .option('-c, --config [path]', 'Your custom config file path, default: ./config.json')
  .option('-o, --output [java/objc/ts/backend]', 'Generate java/objc/ts/backend code, default: java')
  .action((cmd, env) => {

  })
  .parse(process.argv)

let config = program.config || './config.json'
let output = program.output || 'java'
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
  case 'objc': {
    main.objc()
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
    throw new Error('unsupport ouput: ' + output);
  }
}