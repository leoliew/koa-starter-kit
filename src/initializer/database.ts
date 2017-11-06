import * as mongoose from 'mongoose'
import * as bluebird from 'bluebird'
import * as config from 'config'

const mongodbConfig = config.get('database.mongodb')
const DEBUG_FLAG = config.get('database.mongooseDebug')

mongoose.set('Promise', bluebird)
mongoose.set('debug', DEBUG_FLAG)

let dbs: Map<string, mongoose.Connection> = new Map()

function createConnection (url, options = {}) {
  const db = mongoose.createConnection(url, options)
  db.on('error', err => {
    err.message = `[mongoose]${err.message}`
    // logger.error(err)
    console.log(err)
  })

  db.on('disconnected', () => {
    console.log(`[mongoose] ${url} disconnected`)
    // logger.error(`[mongoose] ${url} disconnected`)
  })

  db.on('connected', () => {
    console.log(`[mongoose] ${url} connected successfully`)
    // logger.info(`[mongoose] ${url} connected successfully`)
  })

  db.on('reconnected', () => {
    console.log(`[mongoose] ${url} reconnected successfully`)
    // logger.info(`[mongoose] ${url} reconnected successfully`)
  })
  return db
}

for (let c of mongodbConfig) {
  dbs.set(c.name, createConnection(c.url, c.options))
}

export default dbs
