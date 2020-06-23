import { Document, Model, Schema, Types } from 'mongoose'
import database from '../../connection/mongodb'

const mongodb = database.get('web_backend')

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
