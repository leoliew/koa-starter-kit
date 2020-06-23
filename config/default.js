module.exports = {
  isProd: false,
  // TODO: 1.应用名称配置
  application: 'web_backend',
  database: {
    mongooseDebug: false
  },
  log: {
    level: 'debug'
  },
  port: process.env.PORT || 3000
}
