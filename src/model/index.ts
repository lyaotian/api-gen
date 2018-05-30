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

import { Utils } from '../utils/index'

import * as mustache from 'mustache'
import Property from './Property'
import Model from './Model'
const fs = require('fs-extra')
const path = require('path')
const root = '.'

const property = new Property()
const model = new Model()

/**生成Model类代码 */
export class GenModel {
    config: any
    language: Languages = "java"

    constructor(
        config: Config,
        private fileName = root + '/api-docs.json'
    ) {
        if (!fs.existsSync(fileName)) {
            throw new Error("api-docs.json doesn't exists!")
        }
        const api_data = fs.readJsonSync(this.fileName)
        this.config = Object.assign(config, {
            models: this.getModels(api_data)
        })
    }

    //convert to objc type
    toObjcPropertyType(p = property) {
        let inputType = p.type
        if (inputType == 'number') {
            return Utils.getNumberType(p.format, this.language)
        } else if (inputType == 'array') {
            return 'NSArray<' + this.config.objcPrefix + p.genericType + '> * _Nullable'
        } else if (inputType == 'string') {
            return 'NSString * _Nullable'
        } else if (p.refType) {
            return this.config.objcPrefix + inputType + ' * _Nullable'
        }
        return this.config.objcPrefix + inputType
    }

    //convert to swift type
    toSwiftPropertyType(p = property) {
        let inputType = p.type
        if (inputType == 'number') {
            return `${Utils.getNumberType(p.format, "swift")}`
        } else if (inputType == 'array') {
            return `[${p.genericType}]`
        } else if (inputType == 'string') {
            return 'String'
        } else if (p.refType) {
            return inputType
        }
        return inputType
    }

    //convert to java type
    toJavaPropertyType(p = property) {
        let inputType = p.type
        if (inputType == 'array') {
            return 'ArrayList<' + (p.genericType == 'string' ? 'String' : p.genericType) + '>'
        } else if (inputType == 'number') {
            return Utils.getNumberType(p.format, "java")
        } else if (inputType == 'string') {
            return 'String'
        }

        return inputType
    }

    isJavaPropertyNullable(p = property): boolean {
        let inputType = p.type
        if (inputType == 'number') {
            return false
        }

        return true
    }
    //convert to typescript type default value
    toTsPropertyTypeValue(p = property) {
        let inputType = p.type
        if (inputType == 'array') {
            return 'new Array<' + p.genericType + '>()'
        } else if (
            inputType == 'long' ||
            inputType == 'number' ||
            inputType == 'int' ||
            inputType == 'double' ||
            inputType == 'float'
        ) {
            return 0
        } else if (inputType == 'string') {
            return '""'
        }
        return "new " + inputType + "()"
    }

    getModels(api_data: any) {
        let models = Object.keys(api_data.definitions)
        return models.map((key) => {
            let m = api_data.definitions[key]
            let mKeys = Object.keys(m.properties)

            return {
                doc: m.description || '',
                name: key,
                extends: Utils.getRefType(m.$extends),
                properties: mKeys.map(
                    (k) => {
                        let pItem = m.properties[k]
                        let refType = pItem.$ref && Utils.getRefType(pItem.$ref)
                        let isArray = pItem.type == 'array'
                        if (isArray) {
                            if (pItem.items) {
                                refType = Utils.getRefType(pItem.items.$ref) || pItem.items.type
                            } else {
                                console.error(`no items with array type!! (${key})`)
                            }
                        }

                        return {
                            name: k,
                            type: pItem.type || refType,
                            format: pItem.format,
                            genericType: isArray ? refType : null,
                            refType: refType,
                            isArray: isArray,
                            doc: pItem.description
                        }
                    }
                ).filter((p) => { return p.name != 'id' })
            }
        })
        .filter((model) => { return model != null && model.name != 'BaseModel' })
    }

verifyInput() {
    try {
        const api_data = fs.readJsonSync(this.fileName)
        this.config = Object.assign(this.config, {
            models: this.getModels(api_data)
        })

        // console.log(this.config)
        console.log(`models looks good!`)
    } catch (e) {
        console.error(e)
    }
}

launch(language: Languages) {
    this.language = language

    //read model_*.mustache file and create model code
    switch (language) {
        case "java": {
            this.config.models.forEach((m: Model) => {
                let codeTmp = fs.readFileSync(root + '/template/model_java.mustache', 'utf8')
                let _m: any = Object.assign({}, m)
                _m.packageName = this.config.packageName
                _m.refs = []
                _m.properties = _m.properties.map(
                    (p: Property) => {
                        if (p.refType || p.genericType) {
                            if (p.refType != 'BaseModel' && p.refType != 'string') {
                                _m.refs.push(p.refType)
                            }
                        }
                        let newP = Object.assign(
                            {},
                            p,
                            {
                                type: this.toJavaPropertyType(p),
                                nullable: this.isJavaPropertyNullable(p)
                            }
                        )
                        newP.name = Utils.toCamelName(newP.name, '_')
                        return newP
                    }
                )

                let value = mustache.render(codeTmp, _m)
                let path = './code_output/java/model/' + _m.name + '.java'
                fs.writeFileSync(path, value)
            })
            break
        }
        case "objc": {
            this.config.models.forEach((m: Model) => {
                let codeTmp_h = fs.readFileSync(root + '/template/model_objc_h.mustache', 'utf8')
                let codeTmp_m = fs.readFileSync(root + '/template/model_objc_m.mustache', 'utf8')

                let _m: any = Object.assign({}, m)
                _m.prefix = this.config.objcPrefix
                _m.packageName = this.config.packageName
                _m.refs = []
                _m.properties = _m.properties.map(
                    (p: Property) => {
                        if (p.refType && !p.genericType) {
                            if (p.refType == m.extends) {
                                //use #import "..."
                            } else {
                                _m.refs.push({ refType: p.refType })//use @class
                            }
                        }
                        if (p.genericType) {
                            _m.refs.push({ genericType: p.genericType })
                        }

                        let newP = Object.assign({}, p, { type: this.toObjcPropertyType(p) })
                        newP.name = Utils.toCamelName(newP.name, '_')
                        return newP
                    }
                )

                let value_h = mustache.render(codeTmp_h, _m)
                let value_m = mustache.render(codeTmp_m, _m)
                let path_h = './code_output/objc/model/' + this.config.objcPrefix + _m.name + '.h'
                let path_m = './code_output/objc/model/' + this.config.objcPrefix + _m.name + '.m'
                fs.writeFileSync(path_h, value_h)
                fs.writeFileSync(path_m, value_m)
            })
            break
        }
        case "swift": {
            this.config.models.forEach((m: Model) => {
                let codeTmp = fs.readFileSync(root + '/template/model_swift.mustache', 'utf8')
                let _m: any = { ...m }
                _m.properties = _m.properties.map(
                    (p: Property) => {
                        return {
                            ...p,
                            ...{ name_origin: p.name },
                            ...{ name: Utils.toCamelName(p.name, '_') },
                            ...{ type: this.toSwiftPropertyType(p) }
                        }
                    }
                )

                let value = mustache.render(codeTmp, _m)
                let path = './code_output/swift/model/' + _m.name + '.swift'
                fs.writeFileSync(path, value)
            })
            break
        }
        case "ts": {
            this.config.models.forEach((m: Model) => {
                let codeTmp = fs.readFileSync(root + '/template/model_ts.mustache', 'utf8')
                let _m: any = Object.assign({}, m)
                _m.packageName = this.config.packageName
                _m.refs = []
                _m.gencrics = []
                _m.properties = _m.properties.map(
                    (p: Property) => {
                        let pushIfNotExists = (type: any) => {
                            if (!_m.refs.some((item: string) => item == type)) {
                                if (type !== m.name) {
                                    _m.refs.push(type)
                                }
                            }
                        }

                        if (p.refType || p.genericType) {
                            if (p.refType != 'BaseModel' && p.refType != 'string') {
                                pushIfNotExists(p.refType)
                            }
                        }

                        if (m.extends) {
                            if (m.extends != 'BaseModel' && p.refType != 'string') {
                                pushIfNotExists(m.extends)
                            }
                        }

                        return Object.assign({}, p, { typeValue: this.toTsPropertyTypeValue(p) })
                    }
                )

                let value = mustache.render(codeTmp, _m)
                let path = './code_output/ts/model/' + _m.name + '.ts'
                fs.writeFileSync(path, value)
            })
            break
        }
        case "backend": {
            break
        }
        default: {
            throw new Error("unknow language")
        }
    }

    console.log('Model code were generated to dir \'./code_output\' successfully!!')
}
}
