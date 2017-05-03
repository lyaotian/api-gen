const config = {
    url: 'http://kollway-kollway.oschina.io/api-doc/project/zxwl-api-docs.json',
    packageName: "com.kollway.tanda",
    targetName: "iApp",
    demoUrl: "http://localhost:8001/Thingworx/Things/ThreePlaceSystem_AppThing/Services",
    baseUrl: "http://xf.tandatech.com:5000/Thingworx/Things/ThreePlaceSystem_AppThing/Services",
    objcPrefix: "KWM",
    pageSize: 20,
    apiDir: {
      java: '../AndroidApp/app/src/main/java/com/kollway/api',
      objc: '../iApp/iApp/Classes/API',
        ts: '/Users/lyaotian/Documents/Work/MyProject/Tanda/ZXWL/src/api'
    }
}
export default config