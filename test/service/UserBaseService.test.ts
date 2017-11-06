import { UserBaseService } from '../../src/user/service/UserBaseService'
import { User } from '../../src/user/model/User'
import * as should from 'should'

describe('UserBaseService Test', () => {
  it('getUserByName Method', async () => {
    const name = 'kk'
    const result = await UserBaseService.getUserByName(name)
    result.name.should.equal(name)
    result.phone.should.equal('13455556667')
  })
  it('save Method', async () => {
    const user = {
      phone: '13242890088',
      name: 'leo'
    }
    await UserBaseService.save(user)
    const result = await User.findOne({phone: user.phone})
    result.phone.should.equal(user.phone)
    result.name.should.equal(user.name)
  })
})
