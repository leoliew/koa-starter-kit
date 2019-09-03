module.exports = {
  isProd: false,
  database: {
    redis: {
      url: process.env.REDIS_URI || 'redis://127.0.0.1:6379'
    },
    mongooseDebug: false,
    mongodb: [
      {
        name: 'koa-starter-kit',
        url: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/koa-starter-kit',
        options: {}
      }
    ]
  }
}
