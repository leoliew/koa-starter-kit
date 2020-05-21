import { Document, Schema } from 'mongoose'
import { dbs } from '../../connection'

const mongodb = dbs.get('cash_loan')

const modelName = 'account'

export interface IAccount extends Document {
  name: string,
  balance: number
}

const schema: Schema = new Schema({
  name: String,
  balance: Number
})

export const Account = mongodb.model<IAccount>(modelName, schema, modelName)
