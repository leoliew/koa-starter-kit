import { User, VerificationCode } from '../model'
import { lib, common } from '../modules'
import * as _ from 'lodash'

const {Constant, DateUtil, AppError} = lib
const TokenService = common.service.TokenService

/**
 * 注册类
 */
export class RegisterAndLoginService {
  private codeDelaySeconds = 60 // 验证码等待间隔60s
  private codeTimeOut = 300 // 验证超时300s

  /**
   * 发送验证码
   * @param mobileNumber
   */
  async sendLoginCode ({mobileNumber}: { mobileNumber: string }) {
    await this.checkSendCode({mobileNumber})
    const verificationCode = _.random(100000, 999999).toString()
    // TODO: 调用短信通道
    await VerificationCode.create({
      mobileNumber,
      code: verificationCode.toString(),
      type: Constant.VERIFICATION_CODE.TYPE.LOGIN
    })
    // TODO: 改成用短信通道之后不需要返回code
    return {
      code: verificationCode,
      mobileNumber
    }
  }

  /**
   * 通过验证码登录
   * @param mobileNumber
   * @param code
   */
  async loginByCode ({mobileNumber, code}: { mobileNumber: string, code: string }) {
    const codeQueryTime = DateUtil.getXSecondsAgo(this.codeTimeOut)
    const lastLogin = await VerificationCode.findOne({
      mobileNumber,
      type: Constant.VERIFICATION_CODE.TYPE.LOGIN,
      code,
      createdAt: {$gte: codeQueryTime}
    }).sort({_id: -1})
    if (lastLogin) {
      const token = await this.checkUserAndGenToken({mobileNumber})
      return {token: token}
    } else {
      throw new AppError('验证码不正确')
    }
  }

  /**
   * 检测用户是否存在，生成token并返回
   * @param mobileNumber
   */
  private async checkUserAndGenToken ({mobileNumber}) {
    let user = await User.findOne({mobileNumber})
    if (!user) {
      user = await User.create({mobileNumber})
    }
    const token = await TokenService.genToken(user.id)
    return token
  }

  /**
   * 校验验证码是否可以发送
   * @param mobileNumber
   */
  private async checkSendCode ({mobileNumber}: { mobileNumber: string }) {
    const lastLogin = await VerificationCode.findOne({
      mobileNumber,
      type: Constant.VERIFICATION_CODE.TYPE.LOGIN
    }).sort({_id: -1})
    const currentMoment = DateUtil.getCurrentMoment()
    if (lastLogin && DateUtil.diff(lastLogin.createdAt, currentMoment, 'seconds') < this.codeDelaySeconds) {
      throw new AppError('请等待60秒后再操作')
    }
  }
}
