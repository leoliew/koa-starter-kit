import { Document, Model, Schema } from 'mongoose'
import database from '../../connection/mongodb'
import * as shortid from 'shortid'

const mongodb = database.get('koa-starter-kit')

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
