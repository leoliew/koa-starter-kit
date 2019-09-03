import * as jwt from 'jsonwebtoken'
import { lib } from '../modules'
import { Token } from '../model'

const {Constant, AppError} = lib

const secret = Constant.TOKEN.SECRET

export class TokenService {

  /**
   * 获取token
   * @param userId
   * @param expiresIn
   */
  static async genToken (userId: string, expiresIn = Constant.TOKEN.EXPIRES_IN): Promise<string> {
    let token = jwt.sign({userId}, secret, {expiresIn})
    await Token.create({userId, token})
    return token
  }

  /**
   * 验证token有效性
   * @param token
   */
  static async verify (token: string) {
    const verifyToken = await Token.findOne({token})
    if (!verifyToken) {
      throw new AppError('登陆信息已失效，请重新登陆')
    }
    return jwt.verify(verifyToken.token, secret)
  }

  /**
   * 销毁token
   * @param token
   */
  static async destroyToken (token) {
    const result = await Token.remove({token})
    return result
  }

}
