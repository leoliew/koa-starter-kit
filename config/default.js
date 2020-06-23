module.exports = {
  isProd: false,
  application: 'web_backend',
  database: {
    mongooseDebug: false
  },
  log: {
    level: 'debug'
  },
  port: process.env.PORT || 3000
}
