const fs = require('fs')
// const database = require('../../dist/initializer/database')
// const logger = require('../../build/app/lib/Logger').default
// const models = require('../modules').model

exports.drop = async () => {
  // 每次调用，不能在上层引用
  const db = require('../../dist/initializer/database').default.get('mongodb')
  // return await db.dropDatabase()
  for (let key of Object.keys(db.collections)) {
    await db.collections[key].remove()
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

exports.close = async () => {
  // mongoose.connection.close()
}
