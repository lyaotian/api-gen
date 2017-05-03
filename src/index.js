import { GenModel } from './model'
import { RestModel } from './rest'
import { Utils } from './utils'
import config from './config'

const outDir = './code_output';
const modelDirJava = outDir + '/java/model';
const modelDirObjc = outDir + '/objc/model';
const modelDirTs = outDir + '/ts/model';
const fs = require('fs-extra');

//复制代码到项目
function copyToMyProject(isCopyJava = false, isCopyObjc = false, isCopyTs = false) {
    let apiDir = '';
    let copyFrom = '';
    let copyTo = '';

    //Java
    if (isCopyJava) {
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
    }

    //Objc
    if (isCopyObjc) {
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

    if (isCopyTs) {
        apiDir = config.apiDir.ts;
        fs.emptyDirSync(apiDir + '/model');
        copyFrom = modelDirTs;
        copyTo = apiDir + '/model';
        fs.copySync(copyFrom, copyTo);
        console.log(copyFrom + ' => ' + copyTo);

        copyFrom = outDir + '/ts/index.ts';
        copyTo = apiDir + '/index.ts';
        fs.copy(copyFrom, copyTo);
        console.log(copyFrom + ' => ' + copyTo);
    }
}

function doWork() {
    //创建目录
    fs.removeSync(outDir);
    fs.ensureDirSync(modelDirJava);
    fs.ensureDirSync(modelDirObjc);
    fs.ensureDirSync(modelDirTs);
    //生成代码
    new GenModel(config).launch();
    new RestModel(config).launch();

    copyToMyProject(true, true, true);
}

export function start() {
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
}