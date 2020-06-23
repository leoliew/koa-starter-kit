import { Document, Model, Schema } from 'mongoose'
import { dbs } from '../../connection'
import { lib } from '../modules'

const {Constant} = lib
import * as _ from 'lodash'

const mongodb = dbs.get(Constant.DATABASE.MONGODB_CONFIG.MAIN_DB_NAME)

const modelName = 'verificationCode'

export interface IVerificationCode extends Document {
  mobileNumber: string
  code: string
  type: string
  createdAt?: Date
  updatedAt?: Date
}

const schema: Schema = new Schema({
  mobileNumber: {type: String, required: true, comment: '手机号'},
  code: {type: String, required: true, comment: '验证码'},
  type: {
    type: String,
    required: true,
    enum: _.values(Constant.VERIFICATION_CODE.TYPE),
    comment: '验证码类型'
  }
})
schema.set('timestamps', true)
export const VerificationCode = mongodb.model<IVerificationCode>(modelName, schema, modelName)
