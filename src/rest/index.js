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
import api_data from '../swagger.json.js'
import { Utils } from '../utils'
import fs from 'fs';
import mustache from 'mustache';

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
 * {{doc}}
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
 * {{doc}}
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
                            model:[KWM{{responseType}} class]
                          success:success
                          failure:failure];
}
{{/apis}}
`;

const itemJava = `
  {{#apis}}
    /**
     * {{doc}}
     *
       {{#parameters}}
     * @param {{name}}{{^isRequired}}(可选)({{/isRequired}}    {{{doc}}}
       {{/parameters}}
     * @param callback
     */
    {{methodAnnotation}}
    @{{method}}("{{{path}}}")
    void {{name}}(
            {{#parameters}}
            @{{parameterMethod}}("{{name}}") {{parameterType}} {{name}},
            {{/parameters}}
            Callback<Request{{#isList}}List{{/isList}}Result<{{responseType}}>> callback
    );
  {{/apis}}
`;

/**生成REST API代码 */
export class RestModel {

    constructor(config = {}){
        //create mustache data.json
        this.config = Object.assign(config,{
            apis: this.getAPIs()
        });
    }

    getAPIs(){
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

                let responseType = Utils.getRefType(isList ? response.items.$ref : response.$ref);
                let path = key;

                return {
                    doc: content.summary,
                    path: path,
                    name: Utils.toCamelName(path, '/'),
                    method: httpMethod.toUpperCase(),
                    isList: isList,
                    isUpload: content.parameters.some((p) => {return p.type == 'file'}),
                    responseType: responseType,
                    parameters: content.parameters.map((p) => {
                        return {
                            name: p.name,
                            doc: p.description,
                            type: p.type,
                            isRequired: p.required
                        }
                    })
                };
            }
        );
        result = result.filter((v) => {return v != null;});
        return result;
    }
    
    getRefList(apis, isJava = true) {
        let allRef = apis.map(
        (api) => {
            return api.responseType
        });
        if (isJava){
            allRef = allRef.filter((type) => {return type != 'BaseModel'});
        }
        return Array.from(new Set(allRef));
    }
    genJavaCode(dir){
        let getParameterMethod = (api) => {
            if (api.method == 'POST'){
                return api.isUpload ? 'Part' : 'Field';
            }
            return 'Query';
        }
        let getMethodAnnotation = (api) => {
            if (api.method == 'POST'){
                return api.isUpload ? '@Multipart' : '@FormUrlEncoded';
            }
            return '';
        }
        let getParamType = (paramItem) => {
            let inputType = paramItem.type;
            if(inputType == 'integer' || inputType == 'number'){
                return (paramItem['format'] == 'int64') ? 'long' : 'int';
            }else if (inputType == 'string'){
                return 'String';
            }
            return inputType;
        }
        let javaConfig = Object.assign({}, this.config);
        javaConfig.apis = javaConfig.apis.map((apiItem) => {
            let result = Object.assign(apiItem, {
                methodAnnotation: getMethodAnnotation(apiItem),
                parameters: apiItem.parameters.map(
                    (paramItem) => {
                        return Object.assign(paramItem, {
                            parameterMethod: getParameterMethod(apiItem),
                            parameterType: getParamType(paramItem)
                        })
                    })
            });
            return result;
        });

        let value = mustache.render(itemJava, javaConfig);
        let otherCode = fs.readFileSync('./src/rest/rest_java.mustache', 'utf8');
        value = mustache.render(otherCode, {
            pageSize: this.config.pageSize,
            host: this.config.host,
            port: this.config.port,
            packageName: this.config.packageName,
            refs: this.getRefList(this.config.apis, true),
            code: value
        });
        fs.writeFileSync('./' + dir + '/REST.java', value);
    }

    genObjcCode(dir){

        let otherConfig = {
            pageSize: this.config.pageSize,
            host: this.config.host,
            port: this.config.port,
            objcPrefix: this.config.objcPrefix, 
            refs: this.getRefList(this.config.apis, false)
        };

        let value = mustache.render(itemObjcH, this.config);
        let codeHtmp = fs.readFileSync('./src/rest/rest_objc_h.mustache', 'utf8');
        let codeH = mustache.render(codeHtmp, Object.assign(otherConfig, {code: value}));
        fs.writeFileSync('./' + dir + '/KWMAPIManager.h', codeH);

        value = mustache.render(itemObjcM, this.config);
        let codeMtmp = fs.readFileSync('./src/rest/rest_objc_m.mustache', 'utf8');
        let codeM = mustache.render(codeMtmp, Object.assign(otherConfig, {code: value}));
        fs.writeFileSync('./' + dir + '/KWMAPIManager.m', codeM);
    }

    launch(){
        this.genJavaCode('code_output/java');
        this.genObjcCode('code_output/objc');

        console.log('rest code gen finished!!');
    }
}