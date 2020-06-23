module.exports = {
  database: {
    redis: {
      url: process.env.REDIS_URI || 'redis://127.0.0.1:6379'
    },
    mongodb: [
      {
        name: 'web_backend',
        url: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/web_backend',
        options: {}
      }
    ]
  }
}
