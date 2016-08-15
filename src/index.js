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

// new GenModel(config).launch();
new RestModel(config).launch();
// console.log(Utils.toCamelName('_aa_bb_cc_dd_', '_'));