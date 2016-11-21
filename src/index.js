import { GenModel } from './model'
import { RestModel } from './rest'
import { Utils } from './utils'

const fs = require('fs-extra');
const config = {
    url: 'http://apidoc.kollway.com/project/ballsoul-api-docs.json_',
    packageName: "com.kollway.android.ballsoul",
    objcPrefix: "KWM",
    pageSize: 20,
    host: "ballsoul.kollway.com",
    port: 80,
    apiDir: {
        java: '../android/app/src/main/java/com/kollway/bleducation/api',
        objc: '../ios/BLEducation/Main/Classes/API'
    }
};

//复制代码到项目
function copyToMyProject() {
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
}

function doWork() {
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

    // copyToMyProject();
}

// 下载最新的api-docs.json文件
const download = require('download');
download(config.url)
    .then((data) => {
        console.log('using latest api-docs:\n' + config.url);
        fs.writeFileSync('./src/api-docs.json', data);
        doWork();
    })
    .catch((e) => {
        console.warn("download latest api-docs.json failed:\n" + e.message);
        doWork();
    })
