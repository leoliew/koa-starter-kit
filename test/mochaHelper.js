/* eslint-env mocha */
process.env.NODE_ENV = process.env.NODE_ENV || 'test'
const bluebird = require('bluebird')
const databaseHelpser = require('./helper/database')
require('../build/initDB').dbs.get('db')
const config = require('config')
const redis = require('redis')
const redisConfig = config.database.redis
const mongoose = require('mongoose')

const request = require('./helper/request')
const logger = require('../build/app/lib/Logger').default
const ObjectId = function (id) {
  return mongoose.Types.ObjectId(id)
}
global['ObjectId'] = ObjectId

const nock = require('./helper/nock')
nock.register()
before(async () => {
  bluebird.delay(100)
})

const client  = redis.createClient(redisConfig.port,redisConfig.host);
client.flushall(function (err,result) {
  logger.info("redis flush db "+ result)
})

const fixtureStatus = new Map()
beforeEach(async function () {
  let file = ''
  if (this.currentTest.file.indexOf('controller') >= 0) {
    file = this.currentTest.file.replace('test.js', 'data.js').replace('controller', 'fixtures')
  } else if (this.currentTest.file.indexOf('/model/') >= 0) {
    file = this.currentTest.file.replace('test.js', 'data.js').replace('model', 'fixtures/model')
  } else if (this.currentTest.file.indexOf('/proxy/') >= 0) {
    file = this.currentTest.file.replace('test.js', 'data.js').replace('proxy', 'fixtures/proxy')
  } else if (this.currentTest.file.indexOf('/service/') >= 0) {
    file = this.currentTest.file.replace('test.js', 'data.js').replace('/service/', '/fixtures/service/')
  }
  if (fixtureStatus.has(file)) return
  logger.info('currentTest file', file)
  await databaseHelpser.drop()
  await bluebird.delay(100)
  await databaseHelpser.initData(file)
  fixtureStatus.set(file, true)
})

after(async () => {
  logger.info(' 测试结束 cleanAll nock')
  nock.cleanAll()
})

module.exports.request = request
module.exports.prefix = '/api/v1'
module.exports.nock = nock
