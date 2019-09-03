import { registerAndLoginService } from '../service'
import { VerificationCode, User } from '../model'
import { Constant, Logger } from '../../lib'

describe('用户注册或登录接口测试', () => {
  const verificationCode = {
    mobileNumber: '13242890088',
    code: '123456',
    type: Constant.VERIFICATION_CODE.TYPE.LOGIN
  }
  beforeEach(async () => {
    await VerificationCode.create(verificationCode)
  })

  test('获取验证码成功', async () => {
    const mobileNumber = '13242890009'
    const result = await registerAndLoginService.sendLoginCode({mobileNumber})
    expect(result.mobileNumber).toBe(mobileNumber)
    expect(result.code.length).toBe(6)
  })
  test('用户注册或登录', async () => {
    const params = {
      mobileNumber: verificationCode.mobileNumber,
      code: verificationCode.code
    }
    const result = await registerAndLoginService.loginByCode(params)
    Logger.info(result)
    expect(typeof result.token).toBe('string')
  })
})
