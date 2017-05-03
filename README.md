## API代码生成工具

读取swagger的API定义json文件，生成Objective-C/Java/TypeScript调用代码

## 用法
- `src/config.js` 文件提供配置信息
```
    const config = {
        url: 'http://kollway-kollway.oschina.io/api-doc/project/zxwl-api-docs.json',
        packageName: "com.kollway.tanda",
        targetName: "iTanda",
        demoUrl: "http://192.168.0.2:8888",
        baseUrl: "http://www.kollway.com",
        objcPrefix: "KWM",
        pageSize: 20,
        apiDir: {
            java: '../app/src/main/java/com/kollway/app/api',
            objc: '../../iApp/Classes/API',
            ts: '../../App/src/api'
        }
    }
    export default config
```

- `npm start` 生成代码到`config.apiDir`所指定的目录