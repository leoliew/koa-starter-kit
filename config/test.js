module.exports = {
  database: {
    redis: {
      url: process.env.REDIS_URI || 'redis://127.0.0.1:6379'
    },
    mongooseDebug: true,
    mongodb: [
      {
        // TODO: 4.测试环境DB配置
        name: 'web_backend',
        url: 'mongodb://127.0.0.1:27017/test_backend',
        options: {}
      }
    ]
  }
}
