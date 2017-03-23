import { GenModel } from './model'
import { RestModel } from './rest'
import { Utils } from './utils'

const fs = require('fs-extra');
const config = {
    url: 'http://kollway-kollway.oschina.io/api-doc/project/fws.json',
    packageName: "com.kollway.fws",
    targetName: "iFws",
    demoUrl: "http://192.168.0.2:8888",
    baseUrl: "https://vem.kollway.com",
    objcPrefix: "KWM",
    pageSize: 20,
    apiDir: {
      java: '../app/src/main/java/com/kollway/fws/api',
      objc: '../../iFWS/iFWS/Classes/API'
    }
};

//复制代码到项目
function copyToMyProject() {

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
     fs.copySync(copyFrom, copyTo);
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
