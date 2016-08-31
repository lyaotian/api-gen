import { GenModel } from './model'
import { RestModel } from './rest'
import { Utils } from './utils'

const fs = require('fs-extra');
const config = {
    packageName: "com.kollway.bleducation",
    objcPrefix: "KWM",
    pageSize: 20,
    host: "boyu.kollway.com",
    port: 80,
    apiDir: {
        java: '../android/app/src/main/java/com/kollway/bleducation/api',
        objc: '../ios/BLEducation/Main/Classes/API'
    }
};
const download = require('download');
// 下载最新的API.json文件
let url = 'http://apidoc.kollway.com/project/boyu-api-docs.json';
console.log('downloading ' + url);

download(url).then((data) => {
    fs.writeFileSync('./src/api-docs.json', data);

    //创建目录
    let outDir = './code_output';
    let modelDirJava = outDir + '/java/model';
    let modelDirObjc = outDir + '/objc/model';
    fs.removeSync(outDir);
    fs.ensureDirSync(modelDirJava);
    fs.ensureDirSync(modelDirObjc);
    //生成代码
    new GenModel(config).launch();
    new RestModel(config).launch();
    //复制代码到项目
    let apiDir = '';
    let copyFrom = '';
    let copyTo = '';

    //Java
    apiDir = config.apiDir.java;
    fs.emptyDirSync(apiDir + '/model');
    copyFrom = modelDirJava;
    copyTo = apiDir + '/model';
    fs.copySync(copyFrom, copyTo);
    console.log(copyFrom + ' => ' + copyTo);

    copyFrom = outDir + '/java/REST.java';
    copyTo = apiDir + '/REST.java';
    fs.copy(copyFrom, copyTo);
    console.log(copyFrom + ' => ' + copyTo);

    //Objc
    apiDir = config.apiDir.objc;
    fs.emptyDirSync(apiDir + '/model');
    copyFrom = modelDirObjc;
    copyTo = apiDir + '/model';
    fs.copySync(copyFrom, copyTo);
    console.log(copyFrom + ' => ' + copyTo);

    copyFrom = outDir + '/objc/KWMAPIManager.h';
    copyTo = apiDir + '/KWMAPIManager.h';
    fs.copy(copyFrom, copyTo);
    console.log(copyFrom + ' => ' + copyTo);

    copyFrom = outDir + '/objc/KWMAPIManager.m';
    copyTo = apiDir + '/KWMAPIManager.m';
    fs.copy(copyFrom, copyTo);
    console.log(copyFrom + ' => ' + copyTo);
});
