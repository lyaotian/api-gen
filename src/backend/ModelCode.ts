import * as mustache from 'mustache'
import Property from '../model/Property'
import { Utils } from "../utils/index";
const fs = require('fs-extra')
const path = require('path')

const root = '.'
const outDir = `${root}/code_output/backend/model`
fs.removeSync(outDir)
fs.ensureDirSync(outDir)

class OutputData {
    doc = ''
    name = ''
    refs: string[] = []
    properties: Property[] = []
}

export default class ModelCode {
    config: Config

    constructor(config: Config, api_data: any) {
        this.config = config

        let template = fs.readFileSync(root + '/template/backend/model.mustache', 'utf8')
        for (let name in api_data.definitions) {
            if (name === 'BaseModel') {
                continue
            }
            let value: any = api_data.definitions[name]
            let data = new OutputData()
            data.name = name
            for (let pKey in value.properties) {
                let pValue = value.properties[pKey]
                let p = new Property()
                p.name = pKey
                p.format = pValue.format
                p.doc = pValue.description
                p.refType = pValue.$ref && Utils.getRefType(pValue.$ref)
                p.isArray = pValue.type === 'array'
                if (p.isArray){
                    p.refType = Utils.getRefType(pValue.items.$ref);
                }
                p.genericType = p.isArray ? p.refType : null
                p.type = pValue.type || p.refType || p.genericType
                data.properties.push({...p, ...{typeValue: this.toTsPropertyTypeValue(p)}})
                //引用类型
                if (p.refType && !data.refs.some(item => item === p.refType)) {
                    data.refs.push(p.refType)
                }
            }

            let code = mustache.render(template, data)
            fs.writeFileSync(`${outDir}/${name}.ts`, code)
        }

    }

    //convert to typescript type default value
    toTsPropertyTypeValue(p: Property){
        let inputType = p.type;
        if (inputType == 'array'){
            return 'new Array<' + p.genericType + '>()';
        }else if (
        inputType == 'long' || 
        inputType == 'number' || 
        inputType == 'int' || 
        inputType == 'double' || 
        inputType == 'float'
        ) {
            return 0
        }else if (inputType == 'string') {
            return '""'
        }
        return "new " + inputType + "()";
    }
}