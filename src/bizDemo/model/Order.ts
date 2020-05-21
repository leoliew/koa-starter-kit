import { Document, Schema } from 'mongoose'
import { dbs } from '../../connection'

const mongodb = dbs.get('cash_loan')

const modelName = 'order'

export interface IOrder extends Document {
  from: string,
  to: string,
  amount: number
}

const schema: Schema = new Schema({
  from: String,
  to: String,
  amount: Number
})

export const Order = mongodb.model<IOrder>(modelName, schema, modelName)
