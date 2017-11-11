

module.exports = {
  application: 'koa-starter-kit',
  isProd: false,
  database: {
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || '6379'
    },
    mongooseDebug: false,
    mongodb: [
      {
        name: 'mongodb',
        url: 'mongodb://127.0.0.1:27017/beta_koa',
        options: {}
      }
    ]
  },
  port: process.env.PORT || 3000
}
