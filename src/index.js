/**
 * 主要逻辑:
 * swagger.json转换成REST api所需的json数据
 *  1. definitions为模型定义
 *  2. paths为API请求路径，参数
 * 根据model类的mustache模版文件转换成model类源码:
 *  1. (ok)swagger类型转成Java/Objc
 *  2. (ok)引用其它model类
 *  3. (ok)Java导入包/Objc #import
 *  4. (..)属性字段转驼峰式命名
 *  5. (ok)Java泛型/Objc protocol
 */
import api_data from '../swagger.json.js'
import fs from 'fs';
import mustache from 'mustache';

const packageName = "com.kollway.bleducation";
const objc_prefix = "KWM";
const model = {
    doc: "User",
    name: "User",
    refs: [],/**引用其它类 */
    gencrics: [],/**泛型 */
    properties: [
        {
            name: "id",
            type: "int",
            gencricType: null,
            refType: null,
            isArray: false,
            doc: "描述"
        }
    ]
}
const api = {
    doc: "User login",
    name: "/user/login",
    method: "get/post",
    parameters: [
        {
            name: "user_name",
            type: "int",
        }
    ]
}
//convert to objc type
function toObjcPropertyType(p){
    let inputType = p.type;
    if (inputType == 'int' || inputType == 'integer' || inputType == 'number' || inputType == 'long'){
        return 'NSInteger';
    }else if (inputType == 'float' || inputType == 'double'){
        return 'CGFloat';
    }else if (inputType == 'array'){
        return 'NSArray<' + objc_prefix + p.gencricType + '> *';
    }else if (inputType == 'string'){
        return 'NSString *';
    }else if (p.refType) {
        return objc_prefix + inputType + ' *'
    }
    return objc_prefix + inputType;
}
//convert to java type
function toJavaPropertyType(p){
    let inputType = p.type;
    if (inputType == 'array'){
        return 'ArrayList<' + p.gencricType + '>';
    }else if (inputType == 'integer' || inputType == 'number'){
        return 'int';
    }else if (inputType == 'string'){
        return 'String';
    }
    return inputType;
}
function getRefType(refType = "#/definitions/BaseModel"){
    let lIndex = refType.lastIndexOf('/');
    if (lIndex > 0){
        return refType.substring(lIndex + 1);
    }
    return "BaseModel";
}
function getModels() {

    let models = Object.keys(api_data.definitions);
    return models.map((key) => {
        let m = api_data.definitions[key];
        let mKeys = Object.keys(m.properties);

        return {
            doc: m.description || '',
            name: key,
            properties: mKeys.map(
                (k) => {
                    let pItem = m.properties[k];
                    let refType = pItem.$ref && getRefType(pItem.$ref);
                    let isArray = pItem.type == 'array';
                    if (isArray){
                        refType = getRefType(pItem.items.$ref);
                    }

                    return {
                        name: k,
                        type: pItem.type || refType,
                        gencricType: isArray ? refType : null,
                        refType: refType,
                        isArray: isArray,
                        doc: pItem.description
                    };
                }
            )
        };
    })
}
function getAPIs(){
    return [api];
}

//TODO prepare dir
// try {
//     //java model code dir
//     // let state = fs.statSync('./code_output/java/model');
//     //objc model code dir
//     // state = fs.statSync('./code_output/objc/model');
//     fs.mkdirSync('./code_output/objc/model');
// }catch(e){
//     console.log(e.message);
//     return;
// }

//create mustache data.json
let data_input = {
    packageName: packageName,
    pageSize: 20,
    host: "kollway.com",
    port: 8081,
    models: getModels(),
    apis: getAPIs()
};

//read model_*.mustache file and create model code
data_input.models.forEach((m) => {
    //java code
    let codeTmp = fs.readFileSync('./src/model_java.mustache', 'utf8');
    let _m = Object.assign({}, m);
    _m.packageName = packageName;
    _m.refs = [];
    _m.gencrics = [];
    _m.properties = m.properties.map(
        (p) => {
            if (p.refType || p.gencricType){
                _m.refs.push(p.refType);
            }
            return Object.assign({}, p, {type: toJavaPropertyType(p)});
        }
    );

    let value = mustache.render(codeTmp, _m);
    let path = './code_output/java/model/'+_m.name+'.java';
    fs.writeFileSync(path, value);
});

data_input.models.forEach((m) => {
    //objc code
    let codeTmp_h = fs.readFileSync('./src/model_objc_h.mustache', 'utf8');
    let codeTmp_m = fs.readFileSync('./src/model_objc_m.mustache', 'utf8');

    let _m = Object.assign({}, m);
    _m.prefix = objc_prefix;
    _m.packageName = packageName;
    _m.refs = [];
    _m.gencrics = [];
    _m.properties = _m.properties.map(
        (p) => {
            if (p.refType || p.gencricType){
                _m.refs.push(p.refType);
            }
            return Object.assign({}, p, {type: toObjcPropertyType(p)})
        }
    );

    let value_h = mustache.render(codeTmp_h, _m);
    let value_m = mustache.render(codeTmp_m, _m);
    let path_h = './code_output/objc/model/' + objc_prefix + _m.name + '.h';
    let path_m = './code_output/objc/model/' + objc_prefix + _m.name + '.m';
    fs.writeFileSync(path_h, value_h);
    fs.writeFileSync(path_m, value_m);
});


console.log('code gen finished!!');