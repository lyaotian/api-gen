import { GenModel } from './model'
import { RestModel } from './rest'
import { Utils } from './utils'

const config = {
    packageName: "com.kollway.bleducation",
    objcPrefix: "KWM",
    pageSize: 20,
    host: "kollway.com",
    port: 8081,
};

try {
    new GenModel(config).launch();
    new RestModel(config).launch();
}catch(e){
    console.warn('生成失败:'+e.message+'\n请检查swagger json的格式');
}