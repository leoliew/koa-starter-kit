import { Document, Model, Schema, Types } from 'mongoose'
import database from '../../connection/mongodb'

const mongodb = database.get('web_backend')

const modelName = 'user'

export interface IUser extends Document {
  mobileNumber: string
  firstName: string
  lastName: string
  fatherName: string
  motherName: string
  gender: string
  maritalStatus: string
  email: string
  selfie: string
  currentAddress: string
  currentPINCode: string
  permanentAddress: string
  permanentPINCode: string
  emergencyContact: object
  employmentName: string
  occupation: string
  educationQualification: string
  workingSince: string
  monthlySalary: string
  officeAddress: string
  officeEmail: string
  landLineNumber: string
  bankCardNo: string
  backCardIFSCode: string
  panCard: object
  personalCardInfo: object
}

const schema: Schema = new Schema({
  mobileNumber: {type: String, index: true, unique: true, comment: '手机号'},
  // personalInfo-basic
  firstName: {type: String, comment: '名字姓氏'},
  lastName: {type: String, comment: '名字'},
  fatherName: {type: String, comment: '父亲名字'},
  motherName: {type: String, comment: '母亲名字'},
  gender: {type: String, comment: '性别'},
  maritalStatus: {type: String, comment: '婚姻状况'},
  email: {type: String, comment: 'email'},
  selfie: {type: String, comment: '自拍照片'},
  // personalInfo-residence info
  currentAddress: {type: String, comment: '当前住址'},
  currentPINCode: {type: String, comment: '当前PIN code'},
  permanentAddress: {type: String, comment: '常住地址'},
  permanentPINCode: {type: String, comment: '当前PIN code'},
  // personalInfo-emergency contact
  emergencyContact: [{
    relatives: {type: String, comment: '关系'},
    name: {type: String, comment: '名字'},
    mobileNumber: {type: String, comment: '手机号'}
  }],
  // employmentInfo-working
  employmentName: {type: String, comment: '公司'},
  occupation: {type: String, comment: '行业'},
  educationQualification: {type: String, comment: '学历'},
  workingSince: {type: Number, comment: '工作年限'},
  monthlySalary: {type: String, comment: '月收入'},
  officeAddress: {type: String, comment: '办公地点'},
  officeEmail: {type: String, comment: '公司邮箱'},
  landLineNumber: {type: String, comment: '固话'},
  salarySlip: {type: String, comment: '工资单(拍照上传)'},
  // bankDetail
  bankCardNo: {type: String, comment: '银行卡'},
  backCardIFSCode: {type: String, comment: 'IFS code'},
  // KYC Documents
  panCard: {
    panCardNumber: {type: String, comment: '纳税唯一号'},
    panCardPhoto: {type: String, comment: '纳税唯一号证件图片'}
  },
  personalCardInfo: {
    typeOfKYC: {type: String, comment: 'KYC证件类型'},
    frontPhoto: {type: String, comment: '证件正面照片'},
    backPhoto: {type: String, comment: '证件反面照片'}
  }
})

export const User = mongodb.model<IUser>(modelName, schema, modelName)
