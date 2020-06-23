import { Document, Model, Schema } from 'mongoose'
import { dbs } from '../../connection'
import * as shortid from 'shortid'
import { lib } from '../modules'

const {Constant} = lib

const mongodb = dbs.get(Constant.DATABASE.MONGODB_CONFIG.MAIN_DB_NAME)

const modelName = 'shortUrl'

export interface IShortUrl extends Document {
  shortId: string
  url: string,
  originUrl: string,
  shortUrl: string
}

const schema: Schema = new Schema({
  shortId: {type: String, required: true, index: true, default: shortid.generate()},
  originUrl: {type: String, required: true},
  shortUrl: {type: String, required: true},
  item: {type: String}
})
schema.set('timestamps', true)
export const ShortUrl: Model<IShortUrl> = mongodb.model<IShortUrl>(modelName, schema, modelName)
