module.exports = {
  database: {
    redis: {
      url: process.env.REDIS_URI || 'redis://127.0.0.1:6379'
    },
    mongodb: [
      {
        // TODO: 2.beta环境DB配置
        name: 'web_backend',
        url: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/web_backend',
        options: {}
      }
    ]
  }
}
