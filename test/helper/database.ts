const fs = require('fs')
import database from '../../src/initializer/database'
// const logger = require('../../build/app/lib/Logger').default
const models = require('../modules').model

exports.drop = async () => {
  const db = database.get('mongodb')
  // return await db.dropDatabase()
  for (let key of Object.keys(db.collections)) {
    await db.collections[key].deleteMany({})
  }
}

exports.initData = async (fileName) => {
  // logger.info('init fixtures')
  try {
    const data = require(fileName)
    if (!data.length) return
    // logger.info('init file ', fileName)
    for (const d of data) {
      let model = d.model
      if (typeof d.model === 'string') {
        model = models[d.model]
        if (!model) throw new Error(' 不存在这个 Model ' + d.model)
      }
      await model.create(d.items)
    }
  } catch (err) {
    // logger.info('init file fail ', fileName, err.errors)
    // logger.info('init file fail ', fileName, err.stack)
  }
}
