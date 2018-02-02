import { GenModel } from './model/index'
import { RestModel } from './rest/index'
import { Utils } from './utils/index'
import download from './utils/download'
import Backend from "./backend/index"
const path = require('path')
const root = '.'
const outDir = './code_output'
const fs = require('fs-extra')
export default class Main {
    config: Config

    constructor(config: Config) {
        this.config = config
    }

    public java() {
        let doWork = () => this.copyCodes("java")

        this.downloadApiDocs()
        .then(doWork)
        .catch(doWork)
    }

    public objc() {
        let doWork = () => this.copyCodes("objc")

        this.downloadApiDocs()
        .then(doWork)
        .catch(doWork)
    }

    public swift() {
        let doWork = () => this.copyCodes("swift")

        this.downloadApiDocs()
        .then(doWork)
        .catch(doWork)
    }

    public ts() {
        let doWork = () => this.copyCodes("ts")

        this.downloadApiDocs()
        .then(doWork)
        .catch(doWork)
    }

    public backend() {
        let doWork = () => new Backend(this.config).work()

        this.downloadApiDocs()
        .then(doWork)
        .catch(doWork)
    }

    /**
     * 下载最新的api-docs.json文件
     */
    private downloadApiDocs(): Promise<any> {
        let toPath = root + '/api-docs.json'
        return new Promise((resolve, reject) => {
            download(this.config.url, toPath)
              .then(() => {
                console.log('using latest api-docs:\n' + this.config.url)
                resolve()
              })
              .catch((e: any) => {
                console.warn("download latest api-docs.json failed:\n" + e.message)
                reject()
              })
        })
    }

    /**
     * 创建并复制代码到项目
     * @param isCopyJava 
     * @param isCopyObjc 
     * @param isCopyTs 
     */
    private copyCodes(language: Languages) {
        // 删除现有的目录
        fs.removeSync(outDir)

        // 复制到目标目录
        let apiDir = ''
        let copyFrom = ''
        let copyTo = ''
        switch (language) {
            case "java": {
                const modelDirJava = outDir + '/java/model'
                fs.ensureDirSync(modelDirJava)
                new GenModel(this.config).launch(language)
                new RestModel(this.config).launch(language)

                apiDir = this.config.apiDir.java
                fs.emptyDirSync(apiDir + '/model')
                copyFrom = modelDirJava
                copyTo = apiDir + '/model'
                fs.copySync(copyFrom, copyTo)
                console.log(copyFrom + ' => ' + copyTo)
    
                copyFrom = outDir + '/java/REST.java'
                copyTo = apiDir + '/REST.java'
                fs.copy(copyFrom, copyTo)
                console.log(copyFrom + ' => ' + copyTo)
                break
            }
            case "objc": {
                const modelDirObjc = outDir + '/objc/model'
                fs.ensureDirSync(modelDirObjc)
                new GenModel(this.config).launch(language)
                new RestModel(this.config).launch(language)

                apiDir = this.config.apiDir.objc
                fs.emptyDirSync(apiDir + '/model')
                copyFrom = modelDirObjc
                copyTo = apiDir + '/model'
                fs.copySync(copyFrom, copyTo)
                console.log(copyFrom + ' => ' + copyTo)
    
                copyFrom = outDir + '/objc/KWMAPIManager.h'
                copyTo = apiDir + '/KWMAPIManager.h'
                fs.copy(copyFrom, copyTo)
                console.log(copyFrom + ' => ' + copyTo)
    
                copyFrom = outDir + '/objc/KWMAPIManager.m'
                copyTo = apiDir + '/KWMAPIManager.m'
                fs.copy(copyFrom, copyTo)
                console.log(copyFrom + ' => ' + copyTo)
                break
            }
            case "swift": {
                const modelDirSwift = outDir + '/swift/model'
                fs.ensureDirSync(modelDirSwift)
                new GenModel(this.config).launch(language)
                new RestModel(this.config).launch(language)

                apiDir = this.config.apiDir.swift
                fs.emptyDirSync(apiDir + '/model')
                copyFrom = modelDirSwift
                copyTo = apiDir + '/model'
                fs.copySync(copyFrom, copyTo)
                console.log(copyFrom + ' => ' + copyTo)
    
                copyFrom = outDir + '/swift/ApiManager.swift'
                copyTo = apiDir + '/ApiManager.swift'
                fs.copy(copyFrom, copyTo)
                console.log(copyFrom + ' => ' + copyTo)
                break
            }
            case "ts": {
                const modelDirTs = outDir + '/ts/model'
                fs.ensureDirSync(modelDirTs)
                new GenModel(this.config).launch(language)
                new RestModel(this.config).launch(language)

                apiDir = this.config.apiDir.ts
                fs.emptyDirSync(apiDir + '/model')
                copyFrom = modelDirTs
                copyTo = apiDir + '/model'
                fs.copySync(copyFrom, copyTo)
                console.log(copyFrom + ' => ' + copyTo)
    
                copyFrom = outDir + '/ts/index.ts'
                copyTo = apiDir + '/index.ts'
                fs.copy(copyFrom, copyTo)
                console.log(copyFrom + ' => ' + copyTo)
                break
            }
            case "backend": {
                break
            }
            default:{
                break
            }
        }
    }
}