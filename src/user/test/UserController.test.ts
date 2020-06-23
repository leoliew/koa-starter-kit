import * as UserController from '../controller/UserController'
import { registerAndLoginService } from '../service'
import { Constant, Logger } from '../../lib'
import * as sinon from 'sinon'

describe('UserController测试', () => {
  test('获取验证码成功', async () => {
    const requestParams = {
      code: '123456',
      mobileNumber: '13578778877'
    }
    const stub = sinon.stub(registerAndLoginService, 'loginByCode').returns(requestParams)
    const result = await UserController.loginByCode({params: requestParams})
    stub.restore()
  })
})
