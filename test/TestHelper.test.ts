/* eslint-env mocha */
// process.env.NODE_ENV = process.env.NODE_ENV || 'test'
// const bluebird = require('bluebird')

// const db = require('../../dist/initializer/database').default.get('mongodb')

import database from '../src/initializer/database'

// const databaseHelpser = require('./helper/database')
// require('../src/initializer/database').dbs.get('database')
// const config = require('config')
// const redis = require('redis')
// const redisConfig = config.database.redis
// const mongoose = require('mongoose')

// const request = require('./helper/request')
// const logger = require('../build/app/lib/Logger').default
// const ObjectId = function (id) {
//   return mongoose.Types.ObjectId(id)
// }
// global['ObjectId'] = ObjectId

// const nock = require('./helper/nock')
// nock.register()
// before(async () => {
//   bluebird.delay(100)
// })

// const client  = redis.createClient(redisConfig.port,redisConfig.host);
// client.flushall(function (err,result) {
//   logger.info("redis flush db "+ result)
// })

// const fixtureStatus = new Map()
beforeEach(async function () {
  // let file = ''
  // if (this.currentTest.file.indexOf('controller') >= 0) {
  //   file = this.currentTest.file.replace('test.js', 'data.js').replace('controller', 'fixtures')
  // } else if (this.currentTest.file.indexOf('/model/') >= 0) {
  //   file = this.currentTest.file.replace('test.js', 'data.js').replace('model', 'fixtures/model')
  // } else if (this.currentTest.file.indexOf('/proxy/') >= 0) {
  //   file = this.currentTest.file.replace('test.js', 'data.js').replace('proxy', 'fixtures/proxy')
  // } else if (this.currentTest.file.indexOf('/service/') >= 0) {
  //   file = this.currentTest.file.replace('test.js', 'data.js').replace('/service/', '/fixtures/service/')
  // }
  // if (fixtureStatus.has(file)) return
  // logger.info('currentTest file', file)
  // await databaseHelpser.drop()
  // await bluebird.delay(100)
  // await databaseHelpser.initData(file)
  // fixtureStatus.set(file, true)
  // 加载测试文件对应测试数据
  // 测试文件和测试数据放到相同目录下，并遵循下面的命名
  // 测试文件：User.info.test.js
  // 测试数据文件：User.info.data.js
  if (this.currentTest['file'].indexOf('.test.') < 0) {
    return
  }
  // 必须全部表都清除
  const db = database.get('mongodb')
  for (let key of Object.keys(db.collections)) {
    await db.collections[key].drop()
  }
  const dataFile = this.currentTest['file'].replace('.test.', '.data.')
  let data: any = []
  try {
    data = require(dataFile)
    for (const d of data) {
      d.items = d.items.map((it) => {
        it.id = it._id
        it._id = d.model.ObjectId(it._id)
        return it
      })
      await d.model.create(d.items)
    }
  } catch (err) {
    console.debug('No need to init data: ', dataFile, err)
  }
})

// after(async () => {
//   // logger.info(' 测试结束 cleanAll nock')
//   // nock.cleanAll()
// })

module.exports = this

// module.exports.request = request
// module.exports.prefix = '/api/v1'
// module.exports.nock = nock
