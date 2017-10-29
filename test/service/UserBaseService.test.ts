import * as should from 'should'
import {UserBaseService} from '../../src/api/user/service/UserBaseService'
import {User} from '../../src/api/user/model/User'
const helper = require('../helper')

describe('UserBaseService Test', () => {
  it('save user!', async () => {
    const user = {
      phone: "13242890088",
      name: 'leo'
    }
    await UserBaseService.save(user)
    const result = await User.findOne()
    console.log(result)
    result.phone.should.be.equal(user.phone)
  })
});
