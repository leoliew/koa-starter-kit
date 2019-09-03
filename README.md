# koa-starter-kit

#### 介绍
koa脚手架工具

#### 目录结构
```
.
├── Dockerfile                 
├── Makefile                   // docker打包文件
├── config/                    // 环境变量配置             
│   ├── default.js             // 默认配置
│   ├── development.js         // 开发环境
│   ├── production.js          // 生产环境
│   └── test.js                // 测试环境
├── document/                  // 文档说明
├── jest.config.js             // jest测试配置
├── src/                       
│   ├── common/                // 公共模块
│   │   ├── controller         // 路由控制器
│   │   ├── index.ts           // 文件导出（给外部模块引用）
│   │   ├── middleware         // 模块相关的中间件
│   │   ├── model              // 数据模型目录
│   │   ├── modules.ts         // 文件引入 (从别的模块导入)
│   │   └── router.ts          // 路由
│   ├── connection/            // 连接适配器目录
│   │   ├── index.ts           
│   │   └── mongodb.ts         // mongodb数据库连接
│   ├── lib                    // 工具类目录
│   │   ├── Constant.ts        // 全局变量
│   │   ├── Logger.ts          // log工具类
│   │   └── locales/           // 国际化设置
│   │       ├── en-US.ts       // 英文配置文件
│   │       ├── gu-IN.ts       // 印度语配置文件
│   │       ├── zh-CN.ts       // 中文配置文件
│   │       └── zh_TW.ts
│   ├── router.ts              // 路由入口
│   ├── server.ts              // 服务启动文件
├── test/                      
│   ├── setupTests.ts          // 测试hook
│   └── user/                  // 模块（对应src文件模块）
├── tsconfig.json              // ts 编译配置
└── tslint.json                // tslint代码规范配置
```

#### 使用说明

- `npm start`- 启动
- `npm test` - 测试
- `npm serve` - 调试(修改后台自动重启)
- `npm run build-ts` - 编译 
- `npm watch-ts` - 自动编译 
- `npm tslint` - tslint格式检查 

#### 打包说明

##### 打包到测试环境
- `make build` - 默认会打一个名为`beta`的标签

##### 发布到线上环境
- `make build TAG=master` - 打包到线上环境
> **WARNING**: 
- >1.需要在`master`分支上进行打包
- >2.打包前确认合并了远程分支
- >3.打包前确保通过了所有单元测试

#### 配置相关

##### 在本地跑测试需要启动mongoDB集群，简单操作如下：
    1. npm install run-rs -g
    2. run-rs -p 27010 --dbpath /你的数据库文件文件夹路径/
    第二条参数中如果改端口号需要把test配置中的对应端口也一同修改
    本地已经有了mongo服务的话可以加上 --mongod 省去下载时间
    mongoDB版本要求4.0或以上

##### 请求日志输入格式, 单行日志顺序输入以下内容, 每个内容之间以`|#|`分隔
- 请求时间,时间格式 `2012-03-02T13:35:22.83Z`
- log级别,分为以下几种
    - `log`
    - `trace`
    - `debug`
    - `info`
    - `warn`
    - `error`
    - `fatal`
- 输出日志的文件, 例如 `LogCollector.js:60 (Object.<anonymous>)`
- 请求唯一id ,requestId , 例如 `5d5fc5552bf0cf00150ac0c9`
- userId 用户Id, 如果没有则是 `none`
- type 传输类型, 对于当前服务，请求进来是`in`, 请求出去是 `out`
- requestTime, 请求进来的时间, 例如 `2019-08-26T06:47:46.645Z`
- responseTime, 请求返回的时间, `2019-08-26T06:47:46.645Z`
- retCode, 请求返回码,取response返回的`code`字段
    - `0` 请求处理成功
    - 非 `0`  请求处理失败，具体失败code双方协定
    - `none` 无返回code 
- retMsg,请求返回信息说明, 取response返回的`msg`字段,如果为空则是`none`
- useTime,请求处理耗时,记录毫秒数
- params,请求参数,包括get,post的请求参数
- body,post请求体参数
- query,get请求参数
- httpMethod,请求方法,分为`GET`,`POST`,`PUT`等等
- url,请求地址,不包含域名,例如`/api/v1/user?data=222`
- response,请求返回数据
