import database from '../src/initializer/database'
import * as mongoose from 'mongoose'

beforeEach(async function () {
  if (this.currentTest['file'].indexOf('.test.') < 0) {
    return
  }
  // 必须全部表都清除
  const db = database.get('mongodb')
  for (let key of Object.keys(db.collections)) {
    await db.collections[key].remove({})
  }
  const dataFile = this.currentTest['file'].replace('.test.', '.data.')
  let data: any = []
  try {
    data = require(dataFile)
    for (const d of data) {
      d.items = d.items.map((it) => {
        it.id = it._id
        it._id = mongoose.Types.ObjectId(it._id)
        return it
      })
      await d.model.create(d.items)
    }
  } catch (err) {
    console.debug('No need to init data: ', dataFile, err)
  }
})

after(async () => {
  mongoose.disconnect()
})
