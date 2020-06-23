import { redis, dbs } from '../src/connection'
import {Constant} from '../src/lib'
import * as mongoose from 'mongoose'

process.env.TEST_SUITE = 'web_backend'

beforeEach(async () => {
  const db = dbs.get(Constant.DATABASE.MONGODB_CONFIG.MAIN_DB_NAME)
  for (let key of Object.keys(db.collections)) {
    await db.collections[key].deleteMany({})
  }
})

afterAll(async (done) => {
  await mongoose.disconnect()
  await redis.disconnect()
  return done()
})
