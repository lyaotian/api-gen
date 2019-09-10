declare var DEBUG: boolean
declare var VERSION: string
declare interface Config {
    url: string
    packageName: string
    targetName: string
    demoUrl: string
    baseUrl: string
    objcPrefix: string
    pageSize: number
    apiDir: OutputDir
}

declare interface OutputDir {
    kotlin: string
    java: string
    objc: string
    swift: string
    ts: string
    backend: string
}

type Languages = "kotlin"|"java"|"objc"|"swift"|"ts"|"backend"