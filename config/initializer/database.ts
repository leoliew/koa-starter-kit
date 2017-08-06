// import * as config from 'config'
// import logger from '../../app/lib/Logger'
import * as mongoose from 'mongoose'

// const mongoConfigs = config.get('database.mongodb')
// const DEBUG_FLAG = config.get('database.mongoDebug')

// mongoose.set('Promise', require('bluebird'))
// mongoose.Promise = require('bluebird')
mongoose.set('debug', true)
let dbs: Map<string, mongoose.Connection> = new Map()

function createConnection (url, options = {}) {
  const db = mongoose.createConnection(url, options)
  db.on('error', err => {
    err.message = `[mongoose]${err.message}`
    // logger.error(err)
    console.log(err);
  })

  db.on('disconnected', () => {
    console.log(`[mongoose] ${url} disconnected`);
    // logger.error(`[mongoose] ${url} disconnected`)
  })

  db.on('connected', () => {
    console.log(`[mongoose] ${url} connected successfully`);
    // logger.info(`[mongoose] ${url} connected successfully`)
  })

  db.on('reconnected', () => {
    console.log(`[mongoose] ${url} reconnected successfully`);
    // logger.info(`[mongoose] ${url} reconnected successfully`)
  })
  return db
}

// for (let c of mongoConfigs) {
dbs.set('db', createConnection('mongodb://127.0.0.1:27017/beta_koa', {}))
// }

export default dbs
