import * as mustache from 'mustache'
import RestCode from "./RestCode";
import ModelCode from "./ModelCode";
import download from '../utils/download'
const fs = require('fs-extra')
const path = require('path')
const root = '.'

export default class Backend {
    data = null
    config: Config

    constructor(config: Config) {
        this.config = config
        const fileName = root + '/api-docs.json'
        if (!fs.existsSync(fileName)) {
            throw new Error("api-docs.json doesn't exists!")
        }
        this.data = fs.readJsonSync(fileName)
    }

    public work() {
        let apiDir = this.config.apiDir.backend
        let copyFrom = root + '/code_output/backend/model'
        let copyTo = apiDir + '/model'

        fs.ensureDirSync(copyTo)
        fs.emptyDirSync(copyTo)
        new ModelCode(this.config, this.data)
        this.copy(copyFrom, copyTo)

        apiDir = this.config.apiDir.backend
        copyFrom = root + '/code_output/backend/rest'
        copyTo = apiDir + '/rest'

        fs.ensureDirSync(copyTo)
        new RestCode(this.config, this.data)
        this.copy(copyFrom, copyTo)
    }

    // 下载最新的api-docs.json文件
    // run(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         let toPath = root + '/api-docs.json'
    //         download(this.config.url, toPath)
    //             .then((data: any) => {
    //                 console.log('using latest api-docs:\n' + this.config.url)
    //                 this.work()
    //                 resolve()
    //             })
    //             .catch((e: any) => {
    //                 console.warn("download latest api-docs.json failed:\n" + e.message)
    //                 reject()
    //             })
    //     })

    // }

    private copy(from: string, to: string) {
        fs.copySync(from, to)
        console.log(from + ' => ' + to)
    }
}