import {Document, Model, Schema} from 'mongoose'
import database from '../../../initializer/database'

const db = database.get('db')

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


export const User: Model<UserModel> = db.model<UserModel>(modelName, schema, modelName)
