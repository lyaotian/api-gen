/**
 * 主要逻辑:
 * swagger.json转换成REST api所需的json数据
 *  1. definitions为模型定义
 *  2. paths为API请求路径，参数
 * 根据model类的mustache模版文件转换成model类源码:
 *  1. (ok)swagger类型转成Java/Objc
 *  2. (ok)引用其它model类
 *  3. (ok)Java导入包/Objc #import
 *  4. (ok)属性字段转驼峰式命名
 *  5. (ok)Java泛型/Objc protocol
 */

import { Utils } from '../utils'
import fs from 'fs';
import mustache from 'mustache';

const property = {
    name: "id",
    type: "int",
    gencricType: null,
    refType: null,
    isArray: false,
    doc: "描述"
};
const model = {
    doc: "User",
    name: "User",
    refs: [],/**引用其它类 */
    gencrics: [],/**泛型 */
    properties: [property]
}

/**生成Model类代码 */
export class GenModel {

    constructor(config = {}){
        const fileName = './src/api-docs.json';
        const fs = require('fs-extra');
        if (!fs.existsSync(fileName)){
            throw new Error("api-docs.json doesn't exists!");
        }
        const api_data = fs.readJsonSync(fileName);
        //create mustache data.json
        this.config = Object.assign(config,{
            models: this.getModels(api_data)
        });
    }

    //convert to objc type
    toObjcPropertyType(p = property){
        let inputType = p.type;
        if (inputType == 'number'){
            return Utils.getNumberType(p.format, true);
        }else if (inputType == 'array'){
            return 'NSArray<' + this.config.objcPrefix + p.gencricType + '> * _Nullable';
        }else if (inputType == 'string'){
            return 'NSString * _Nullable';
        }else if (p.refType) {
            return this.config.objcPrefix + inputType + ' * _Nullable'
        }
        return this.config.objcPrefix + inputType;
    }
    //convert to java type
    toJavaPropertyType(p = property){
        let inputType = p.type;
        if (inputType == 'array'){
            return 'ArrayList<' + p.gencricType + '>';
        }else if (inputType == 'number'){
            return Utils.getNumberType(p.format, false);
        }else if (inputType == 'string'){
            return 'String';
        }
        return inputType;
    }
    getModels(api_data) {
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
                        let refType = pItem.$ref && Utils.getRefType(pItem.$ref);
                        let isArray = pItem.type == 'array';
                        if (isArray){
                            refType = Utils.getRefType(pItem.items.$ref);
                        }

                        return {
                            name: Utils.toCamelName(k, '_'),
                            type: pItem.type || refType,
                            format: pItem.format,
                            gencricType: isArray ? refType : null,
                            refType: refType,
                            isArray: isArray,
                            doc: pItem.description
                        };
                    }
                ).filter((p) => {return p.name != 'id'})
            };
        }).filter((model) => {return model.name != 'BaseModel'});
    }

    launch(){
        //read model_*.mustache file and create model code
        this.config.models.forEach((m) => {
            //create java code
            let codeTmp = fs.readFileSync('./src/model/model_java.mustache', 'utf8');
            let _m = Object.assign({}, m);
            _m.packageName = this.config.packageName;
            _m.refs = [];
            _m.gencrics = [];
            _m.properties = m.properties.map(
                (p) => {
                    if (p.refType || p.gencricType){
                        if (p.refType != 'BaseModel'){
                            _m.refs.push(p.refType);
                        }
                    }
                    return Object.assign({}, p, {type: this.toJavaPropertyType(p)});
                }
            );

            let value = mustache.render(codeTmp, _m);
            let path = './code_output/java/model/'+_m.name+'.java';
            fs.writeFileSync(path, value);
        });

        this.config.models.forEach((m) => {
            //create objc code
            let codeTmp_h = fs.readFileSync('./src/model/model_objc_h.mustache', 'utf8');
            let codeTmp_m = fs.readFileSync('./src/model/model_objc_m.mustache', 'utf8');

            let _m = Object.assign({}, m);
            _m.prefix = this.config.objcPrefix;
            _m.packageName = this.config.packageName;
            _m.refs = [];
            _m.gencrics = [];
            _m.properties = _m.properties.map(
                (p) => {
                    if (p.refType && !p.gencricType){
                        _m.refs.push({refType: p.refType});
                    }
                    if (p.gencricType){
                        _m.refs.push({gencricType: p.gencricType});
                    }

                    return Object.assign({}, p, {type: this.toObjcPropertyType(p)})
                }
            );

            let value_h = mustache.render(codeTmp_h, _m);
            let value_m = mustache.render(codeTmp_m, _m);
            let path_h = './code_output/objc/model/' + this.config.objcPrefix + _m.name + '.h';
            let path_m = './code_output/objc/model/' + this.config.objcPrefix + _m.name + '.m';
            fs.writeFileSync(path_h, value_h);
            fs.writeFileSync(path_m, value_m);
        });

        console.log('Model code were generated to dir \'./code_output\' successfully!!');
    }
}
