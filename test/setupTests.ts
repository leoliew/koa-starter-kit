import database from '../src/connection/mongodb'
import { redis } from '../src/connection'
import * as mongoose from 'mongoose'

process.env.TEST_SUITE = 'koa-starter-kit'

beforeEach(async () => {
  const db = database.get('koa-starter-kit')
  for (let key of Object.keys(db.collections)) {
    await db.collections[key].deleteMany({})
  }
})

afterAll(async (done) => {
  await mongoose.disconnect()
  await redis.disconnect()
  return done()
})
