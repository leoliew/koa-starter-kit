const path = require('path')
// const logger = require('../app/lib/Logger')
// logger.error('asdfasdf default')

module.exports = {
  application: 'klg-p2p',
  root: path.resolve(__dirname, '..'),
  isProd: false,
  database: {
    redis: {
      host: process.env.REDIS_HOST || 'joda',
      port: process.env.REDIS_PORT || '6381'
    },
    mongoDebug: false,
    mongodb: [
      {
        name: 'db',
        url: process.env.MONGODB,
        options: {}
      }
    ]
  },
  port: process.env.PORT || 3000,
  p2p: {
    url: process.env.P2P_URL || 'http://192.168.2.28:3000/api/v1'
  },
  custodian: {
    url: process.env.CUSTODIAN_URL || 'http://192.168.1.69:3000'
  },
  trade: {
    url: process.env.TRADE_URL || 'http://trade.beta.kll',
    token: '123456'
  },
  loanTransfer: {
    url: process.env.LOANTRANSFER_URL || 'http://loan.beta.kl',
    token: '123456'
  },
  koala: {
    url: process.env.KOALA_URL || 'http://120.76.226.187:9041'
  }
}
