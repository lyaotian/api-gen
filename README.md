## API代码生成工具

读取swagger的API定义json文件，生成Java/Objective-C/TypeScript/backend相关调用代码

## 用法
- `./config.json` 文件提供配置信息
```
{
    "url": "http://example.com/swagger-api-docs.json",
    "packageName": "com.example.app",
    "targetName": "iApp",
    "demoUrl": "http://localhost:8001/Thingworx/Things/ThreePlaceSystem_AppThing/Services",
    "baseUrl": "http://api.example.com",
    "objcPrefix": "KWM",
    "pageSize": 20,
    "apiDir": {
      "java": "/path_to_android/app/src/main/java/com/kollway/api",
      "objc": "/path_to_ios/iApp/Classes/API",
        "ts": "/path_to_webapp/src/api"
    }
}

```

- `npm run build` 编译
- `node bin/bundle.js --help` 查看支持参数
- `node bin/bundle.js -c ./config.json -o ts` 读取当前目录的config.json配置，生成typescript代码