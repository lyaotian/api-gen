/**
 * 主要逻辑:
 * swagger.json转换成REST api所需的json数据
 *  1. definitions为模型定义
 *  2. paths为API请求路径，参数
 * 根据model类的mustache模版文件转换成model类源码:
 *  1. (ok)读取api 路径
 *  2. (ok)读取api http method
 *  3  (..)读取api 请求参数,必须/可选参数
 *  4. (ok)读取api 返回类型(只是网址就没有返回类型)
 *  5. (ok)是否为list 返回
 *  6. 引用其它类(java:import,objc:#import)
 *  7. 上传文件API
 */
import { Utils } from '../utils/index'
import * as mustache from 'mustache'
const fs = require('fs-extra')
const path = require('path')
const root = '.'

interface APIItem {
    method: "POST"|"GET"
    parameters: APIParameter[]
    isUpload: boolean
}
interface APIParameter {
    name: string
    in: string
    description: string
    required: boolean
    type: string
    format: string
}

const api = {
    doc: "User login",
    path: "/user/login",
    name: "userLogin",
    method: "POST",
    isList: false,
    isUpload: false,
    responseType: "BaseModel",
    parameters: [
        {
            name: "user_name",
            doc: "description",
            type: "int",
            isRequired: true
        }
    ]
}

const itemObjcH = `
{{#apis}}
/**
 * {{{doc}}}
{{#parameters}}
 * @param {{name}}{{^isRequired}}(可选)({{/isRequired}}    {{{doc}}}
{{/parameters}}
 **/
- (NSURLSessionDataTask *){{name}}:(NSDictionary *)parameters
                        {{#isUpload}}
                        filePath:(NSDictionary *)filePath
                        {{/isUpload}}
                        success:(void (^)(NSURLSessionDataTask *task, KWMRequest{{#isList}}List{{/isList}}Result *result))success
                        failure:(void (^)(NSURLSessionDataTask *task, NSError *error))failure;
{{/apis}}
                        `;

const itemObjcM = `
{{#apis}}
/**
 * {{{doc}}}
{{#parameters}}
 * @param {{name}}{{^isRequired}}(可选)({{/isRequired}}    {{{doc}}}
{{/parameters}}
 **/
- (NSURLSessionDataTask *){{name}}:(NSDictionary *)parameters
                                   {{#isUpload}}
                                   filePath:(NSDictionary *)filePath
                                   {{/isUpload}}
                                   success:(void (^)(NSURLSessionDataTask *task, KWMRequest{{#isList}}List{{/isList}}Result *result))success
                                   failure:(void (^)(NSURLSessionDataTask *task, NSError *error))failure{
    {{#parameters}}
        {{#isRequired}}
    NSAssert(parameters[@"{{name}}"], @"required parameter: {{name}}");
        {{/isRequired}}
    {{/parameters}}

    {{#isList}}
    parameters = [self processListAPIParameters:parameters];
    {{/isList}}

    NSString *apiPath = @"{{{path}}}";
    return [self startSessionTask:KWMHTTPMethod{{method}}
                          apiPath:apiPath
                       parameters:parameters
                        filePaths:{{#isUpload}}filePath{{/isUpload}}{{^isUpload}}nil{{/isUpload}}
                    jsonParameter:NO
                           result:[KWMRequest{{#isList}}List{{/isList}}Result class]
                            model:[{{objcPrefix}}{{responseType}} class]
                          success:success
                          failure:failure];
}
{{/apis}}
`

const itemJava = `
  {{#apis}}
    /**
     * {{{doc}}}
     *
     {{#isUpload}}
     * 注意: 上传文件参数的map的key string应该这样构建: xxx; filename=\\"xxx\\" (xxx为参数名)
     {{/isUpload}}
       {{#parameters}}
     * @param {{name}}{{^isRequired}}(可选)    {{/isRequired}} {{{doc}}}
       {{/parameters}}
     * @return Call
     */
    {{methodAnnotation}}
    @{{method}}("{{{path}}}")
    Call<Request{{#isList}}List{{/isList}}Result<{{responseType}}>> {{name}}(
            {{#parameters}}
            @{{parameterMethod}}({{#fieldName}}"{{.}}"{{/fieldName}}) {{{parameterType}}} {{name}}{{^last}},{{/last}}
            {{/parameters}}
    );
  {{/apis}}
`

const itemTs = `
{{#apis}}
/**
 * {{{doc}}}
 *
   {{#parameters}}
 * @param {{name}}{{^isRequired}}(可选)    {{/isRequired}} {{{doc}}}
   {{/parameters}}
 * @return Call
 */
export function {{name}}(
    {{#isUpload}}
    parameters: FormData,
    {{/isUpload}}
    {{^isUpload}}
    parameters: {
        {{#parameters}}
        {{name}}: {{parameterType}},
        {{/parameters}}
    },
    {{/isUpload}}
    success: (result: Request{{#isList}}List{{/isList}}Result<{{responseType}}>) => void,
    failure: (error: RequestError) => void,
    {{#isUpload}}
    progress?: (percent: number) => void,
    {{/isUpload}}
) {
    {{#isUpload}}
    requestUpload<{{responseType}}>(
    {{/isUpload}}
    {{^isUpload}}
    request{{#isList}}List{{/isList}}<{{responseType}}>(
    {{/isUpload}}
        '{{method}}',
        '{{{path}}}',
        parameters,
        success,
        failure,
        {{#isUpload}}
        progress
        {{/isUpload}}
    )
}
{{/apis}}
`

/**生成REST API代码 */
export class RestModel {
    language :Languages = "java"
    config: any

    constructor(
        config: Config,
        fileName = root + '/api-docs.json'
    ){
        if (!fs.existsSync(fileName)){
            throw new Error("api-docs.json doesn't exists!");
        }
        const api_data = fs.readJsonSync(fileName);
        //create mustache data.json
        this.config = {...config, ...{
            apis: this.getAPIs(api_data)
        }}
    }

    getAPIs(api_data: any){
        let paths = Object.keys(api_data.paths);

        let result = paths.map(
            (key) => {
                let value = api_data.paths[key];
                let valueKeys = Object.keys(value);
                let httpMethod = valueKeys[0];
                let content = value[httpMethod];
                let response = content.responses["200"].schema;
                if (!response){
                    console.warn('none response!! ' + key);
                    return null;
                }
                let isList = response.type == 'array';
                let responseType = ""
                if (isList) {
                    if (!response.items) {
                        console.error(`no items with array type!! (${key})`)
                    }
                    responseType = Utils.getRefType(response.items.$ref)
                } else {
                    responseType = Utils.getRefType(response.$ref)
                }

                let path = key;
                if (!content.parameters) {
                    content.parameters = []
                }

                if (isList){
                    content.parameters.splice(0, 0, {
                        name: 'page',
                        description: '页数',
                        type: 'number',
                        format: 'int32',
                        in: 'Query',
                        required: true
                    });
                }

                return {
                    doc: content.summary,
                    path: path,
                    name: Utils.toCamelName(path, '/'),
                    method: httpMethod.toUpperCase(),
                    isList: isList,
                    isUpload: content.parameters.some((p: APIParameter) => {return p.type == 'file'}),
                    responseType: responseType,
                    parameters: content.parameters.map((p: APIParameter, i: number) => {
                        return {
                            name: p.name,
                            doc: p.description,
                            type: p.type,
                            format: p.format,
                            isRequired: p.required,
                            last: (i >= content.parameters.length-1)
                        }
                    })
                };
            }
        );
        result = result.filter((v) => {return v != null;});
        return result;
    }

    getRefList(apis: any[], language: Languages) {
        let allRef = apis.map(
        (api) => {
            return api.responseType
        });
        if (language == "java" || language == "ts"){
            allRef = allRef.filter((type) => {return type != 'BaseModel'});
        }
        return Array.from(new Set(allRef));
    }

    verifyInput() {
        let getParamType = (paramItem: APIParameter) => {
            let inputType = paramItem.type;
            if (inputType == 'file'){
                return 'FormData';
            }
            return inputType;
        }
        try {
            let config = Object.assign({}, this.config);
            config.apis = config.apis.map((apiItem: APIItem) => {
                let result = Object.assign(apiItem, {
                    parameters: apiItem.parameters.map(
                        (paramItem: APIParameter, i: number) => {
                            return Object.assign(paramItem, {
                                parameterType: getParamType(paramItem),
                            })
                        })
                });
                return result;
            })

            // console.log(this.config)
            console.log(`apis looks good!`)
        } catch (e) {
            console.error(e)
        }
    }

    genTsCode(dir: string){
        let getParamType = (paramItem: APIParameter) => {
            let inputType = paramItem.type;
            if (inputType == 'file'){
                return 'FormData';
            }
            return inputType;
        }
        let config = Object.assign({}, this.config);
        config.apis = config.apis.map((apiItem: APIItem) => {
            let result = Object.assign(apiItem, {
                parameters: apiItem.parameters.map(
                    (paramItem: APIParameter, i: number) => {
                        return Object.assign(paramItem, {
                            parameterType: getParamType(paramItem),
                        })
                    })
            });
            return result;
        });

        let value = mustache.render(itemTs, config);
        let otherCode = fs.readFileSync(root + '/template/rest_ts.mustache', 'utf8');
        value = mustache.render(otherCode, Object.assign({
            refs: this.getRefList(this.config.apis, this.language),
            code: value
        }, this.config));
        fs.writeFileSync('./' + dir + '/index.ts', value);
    }
    
    genJavaCode(dir: string){
        const keywords = ["abstract","continue","for","new","switch","assert","default","goto","package","synchronized","boolean","do","if","private","this","break","double","implements","protected","throw","byte","else","import","public","throws","case","enum","instanceof","return","transient","catch","extends","int","short","try","char","final","interface","static","void","class","finally","long","strictfp","volatile","const","float","native","super","while"]
        let getParameterMethod = (api: APIItem) => {
            if (api.method == 'POST'){
                return api.isUpload ? 'Part' : 'Field';
            }
            return 'Query';
        }
        let getMethodAnnotation = (api: APIItem) => {
            if (api.method == 'POST'){
                return api.isUpload ? '@Multipart' : ((api.parameters != null && api.parameters.length > 0) ? '@FormUrlEncoded' : '')
            }
            return '';
        }
        let getParamType = (paramItem: APIParameter) => {
            let inputType = paramItem.type;
            if(inputType == 'number'){
                return Utils.getNumberType(paramItem.format, "java");
            }else if (inputType == 'string'){
                return 'String';
            }else if (inputType == 'file'){
                return 'Map<String, RequestBody>';
            }
            return inputType;
        }
        let javaConfig = Object.assign({}, this.config);
        javaConfig.apis = javaConfig.apis.map((apiItem: APIItem) => {
            let result = Object.assign(apiItem, {
                methodAnnotation: getMethodAnnotation(apiItem),
                parameters: apiItem.parameters.map(
                    (paramItem: APIParameter, i: number) => {
                        const name = paramItem.name
                        let fieldName = name
                        let method = getParameterMethod(apiItem);
                        if (method == 'Part' && i == apiItem.parameters.length - 1){
                            method = 'PartMap';
                            fieldName = '';
                        }
                        return Object.assign(paramItem, {
                            fieldName,
                            parameterMethod: method,
                            parameterType: getParamType(paramItem),
                            name: (keywords.indexOf(name) >= 0) ? `_${name}` : name
                        })
                    })
            });
            return result;
        });

        let value = mustache.render(itemJava, javaConfig);
        let otherCode = fs.readFileSync(root + '/template/rest_java.mustache', 'utf8');
        value = mustache.render(otherCode, Object.assign({
            refs: this.getRefList(this.config.apis, this.language),
            code: value
        }, this.config));
        fs.writeFileSync('./' + dir + '/REST.java', value);
    }

    genObjcCode(dir: string){
        let otherConfig = Object.assign({refs: this.getRefList(this.config.apis, this.language)}, this.config);

        let value = mustache.render(itemObjcH, this.config);
        let codeHtmp = fs.readFileSync(root + '/template/rest_objc_h.mustache', 'utf8');
        let codeH = mustache.render(codeHtmp, Object.assign(otherConfig, {code: value}));
        fs.writeFileSync('./' + dir + '/KWMAPIManager.h', codeH);

        value = mustache.render(itemObjcM, this.config);
        let codeMtmp = fs.readFileSync(root + '/template/rest_objc_m.mustache', 'utf8');
        let codeM = mustache.render(codeMtmp, Object.assign(otherConfig, {code: value}));
        fs.writeFileSync('./' + dir + '/KWMAPIManager.m', codeM);
    }

    genSwiftCode(dir: string) {
        let getParamType = (paramItem: APIParameter) => {
            let inputType = paramItem.type;
            if (inputType == 'file'){
                return 'FormData';
            }
            return inputType;
        }
        let config = Object.assign({}, this.config);
        config.apis = config.apis.map((apiItem: APIItem) => {
            let result = Object.assign(apiItem, {
                parameters: apiItem.parameters.map(
                    (paramItem: APIParameter, i: number) => {
                        return Object.assign(paramItem, {
                            parameterType: getParamType(paramItem),
                        })
                    }),
                method: apiItem.method.toLowerCase(),
            });
            return result;
        });

        const itemTemplate = `
    {{#apis}}
    /**
    * {{{doc}}}
    *
    {{#parameters}}
    * @param {{name}}{{^isRequired}}(可选)    {{/isRequired}} {{{doc}}}
    {{/parameters}}
    {{^isUpload}}
    * @return DataRequest
    {{/isUpload}}
    */
    {{^isUpload}}
    @discardableResult
    {{/isUpload}}
    public func {{name}}(
        parameters: Parameters,
        {{#isUpload}}
        fileParameters: [String: URL],
        {{/isUpload}}
        success: @escaping (Request{{#isList}}List{{/isList}}Result<{{responseType}}>) -> Void,
        failure: @escaping (Error) -> Void ){{^isUpload}} -> DataRequest{{/isUpload}} {

        let url = "\\(baseUrl){{{path}}}"
        {{#parameters}}
        {{#isRequired}}
        assert(parameters["{{name}}"] != nil{{#isUpload}} || fileParameters["{{name}}"] != nil{{/isUpload}}, "缺少参数: {{name}}")
        {{/isRequired}}
        {{/parameters}}

        {{#isUpload}}
        upload(url,
            method: .{{method}},
            parameters: parameters,
            fileParameters: fileParameters,
            encodingCompletion: { (result: SessionManager.MultipartFormDataEncodingResult) in
                switch result {
                case .success(let uploadRequest, _, _):
                    uploadRequest.responseObject(completionHandler: { (response: DataResponse<Request{{#isList}}List{{/isList}}Result<{{responseType}}>>) in
                        switch response.result {
                        case .success(let result):
                            success(result)
                        case .failure(let error):
                            failure(error)
                        }
                    })
                case .failure(let error):
                    failure(error)
                }
        })
        {{/isUpload}}
        {{^isUpload}}
        let req = request(url, method: .{{method}}, parameters: parameters)
        req.responseObject { (response: DataResponse<Request{{#isList}}List{{/isList}}Result<{{responseType}}>>) in
            switch response.result {
            case .success(let result):
                success(result)
            case .failure(let error):
                failure(error)
            }
        }
        return req
        {{/isUpload}}
    }
    {{/apis}}
        `
        let value = mustache.render(itemTemplate, config);
        let otherCode = fs.readFileSync(root + '/template/rest_swift.mustache', 'utf8');
        value = mustache.render(otherCode, Object.assign({
            refs: this.getRefList(this.config.apis, this.language),
            code: value
        }, this.config));
        fs.writeFileSync('./' + dir + '/ApiManager.swift', value);
    }

    launch(language: Languages){
        this.language = language

        switch (language) {
            case "java": {
                this.genJavaCode('code_output/java')
                break
            }
            case "objc": {
                this.genObjcCode('code_output/objc')
                break
            }
            case "swift": {
                this.genSwiftCode('code_output/swift')
                break
            }
            case "ts": {
                this.genTsCode('code_output/ts')
                break
            }
            case "backend": {
                break
            }
            default:{
                break
            }
        }

        console.log('REST API code were generated to dir \'./code_output\' successfully!!');
    }
}
