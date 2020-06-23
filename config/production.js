module.exports = {
  isProd: true,
  database: {
    redis: {
      url: process.env.REDIS_URI || 'redis://127.0.0.1:6379'
    },
    mongodb: [
      {
        // TODO: 3.生产环境DB配置
        name: 'web_backend',
        url: process.env.MONGOLAB_URI,
        options: {}
      }
    ]
  }
}
