import * as mustache from 'mustache'
import { Utils } from "../utils/index";

import * as fs from 'fs-extra'
import * as path from 'path'

const root = '.'
const outDir = `${root}/code_output/backend/rest`
fs.ensureDirSync(outDir)

class Parameter {
    in: 'query' | 'path' | 'body' | 'formData' | 'header' = 'query'
    description = ''
    name = ''
    required = false
    type = ''
}
class OutputData {
    path = ''
    doc = ''
    name = ''
    parameters = []
    isGET = false
    isList = false
    isUpload = false
    dataType = ''
    refs: string[] = []
    code1 = ''
    code2 = ''
}

function replaceAll(text: string, replacement: string) {
    return text.replace(new RegExp('\t', 'g'), replacement)
}

/**
 * 逻辑:
 * 1.读取service.mustache模版文件
 * 2.处理来自api-docs.json的数据:api_data，生成OutputData模版数据
 * 3.读取实际项目里面已生成的代码，获取//code1 //code2里面括起来的手写的代码，加入模版数据
 * 4.生成最终代码到code_output
 */
export default class RestCode {
    config: Config
    api_data: any

    constructor(config: Config, api_data: any) {
        this.config = config
        this.api_data = api_data
        let projectDir = this.config.apiDir.backend + '/rest'
        let template = fs.readFileSync(root + '/template/backend/service.mustache', 'utf8')
        let exists = fs.readdirSync(projectDir).map(item => `${item}`)

        for (let path in api_data.paths) {
            const data = this.createOutput(path)
            //读取实际项目里面手写的代码
            let customCodes = new Map<string, string>()
            let outFileName = `${data.name}.ts`
            for (let inFileName of exists) {
                if (outFileName == inFileName) {
                    let content = fs.readFileSync(`${projectDir}/${inFileName}`, 'utf-8')
                    this.addExistsCode(content, data, customCodes)
                    break
                }
            }
            for (let key of customCodes.keys()) {
                let value = customCodes.get(key)
                let d: any = data
                d[key.substring(2)] = value
            }

            let code = mustache.render(template, data)
            let writeTo = `${outDir}/${outFileName}`
            fs.writeFileSync(writeTo, code)
        }
    }

    private createOutput(path: string): OutputData {
        const data = new OutputData()
        data.path = path
        let value: any = this.api_data.paths[path]
        let api
        if (api = value['post']) {
            data.isGET = false
        } else if (api = value['get']) {
            data.isGET = true
        }
        if (api) {
            data.name = this.toSerivceName(path)
            data.doc = api.summary
            data.parameters = api.parameters.map((item: Parameter) => {
                if (item.type === 'file') {
                    data.isUpload = true
                    item.type = 'string'
                }
                return item
            })
            let ok = api.responses[`200`]
            data.isList = ok && ok.schema && ok.schema.items
            if (data.isList) {
                data.dataType = Utils.getRefType(ok.schema.items.$ref)
            } else {
                data.dataType = Utils.getRefType(ok.schema.$ref)
            }
            //引用类型
            let refType = data.dataType
            if (!data.refs.some(item => item === refType)) {
                if (refType !== 'BaseModel') {
                    data.refs.push(refType)
                }
            }
        }
        return data
    }

    private addExistsCode(fileContent: string, data: OutputData, customCodes: Map<string, string>): boolean {
        let added = false
        let lines = fileContent.split('\n')
        let codeTag: string = ''
        let count = lines.length
        for (let i = 0; i < count; i++) {
            let line = lines[i]
            let tagLine = line.trim()
            if ('//code1' == tagLine) {
                if (codeTag != tagLine) {
                    codeTag = tagLine
                } else {
                    codeTag = ''
                }
                continue
            }
            if ('//code2' == tagLine) {
                if (codeTag != tagLine) {
                    codeTag = tagLine
                } else {
                    codeTag = ''
                }
                continue
            }

            if (codeTag && line) {
                let code: string = customCodes.get(codeTag) || ''
                code = `${code}${line}`

                if (code.length > 0) {
                    customCodes.set(codeTag, `${code}${i < count - 1 ? '\n' : ''}`)
                    added = true
                }
            }
        }

        return added
    }

    private toSerivceName(input: string) {
        input = Utils.toCamelName(input, '/')
        if (input && input.length > 1) {
            return `${input.charAt(0).toUpperCase()}${input.substring(1)}`
        }
        return ''
    }
}