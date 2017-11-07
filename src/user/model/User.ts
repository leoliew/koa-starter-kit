import { Document, Model, Schema } from 'mongoose'
import database from '../../connection/mongodb'

const mongodb = database.get('mongodb')

export interface IUser {
  phone: string
  name: string
  isRegister: boolean
}

const modelName = 'User'

export interface UserModel extends IUser, Document {

}

const schema: Schema = new Schema({
  phone: {type: String},
  name: {type: String},
  isRegister: {type: Boolean}
})

export const User: Model<UserModel> = mongodb.model<UserModel>(modelName, schema, modelName)
