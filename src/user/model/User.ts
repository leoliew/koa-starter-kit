import { Document, Model, Schema, Types } from 'mongoose'
import { dbs } from '../../connection'
import { lib } from '../modules'

const {Constant} = lib

const mongodb = dbs.get(Constant.DATABASE.MONGODB_CONFIG.MAIN_DB_NAME)

const modelName = 'user'

export interface IUser extends Document {
  mobileNumber: string
  firstName?: string
  lastName?: string
  createdAt?: Date
  updatedAt?: Date
}

const schema: Schema = new Schema({
  mobileNumber: {type: String, index: true, unique: true, comment: '手机号'},
  firstName: {type: String, comment: '名字姓氏'},
  lastName: {type: String, comment: '名字'}
})

export const User = mongodb.model<IUser>(modelName, schema, modelName)
