module.exports = {
  isProd: false,
  application: 'web_backend',
  mongooseDebug: false,
  log: {
    level: 'debug'
  },
  port: process.env.PORT || 3000
}
