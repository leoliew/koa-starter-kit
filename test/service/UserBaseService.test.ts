import { UserBaseService } from '../../src/api/user/service/UserBaseService'
import { User } from '../../src/api/user/model/User'
import * as mongoose from 'mongoose'
// const helper = require('../helper')
// require('should')

describe('UserBaseService Test', () => {
  it('save user!', async () => {
    const user = {
      phone: '13242890088',
      name: 'leo'
    }
    await UserBaseService.save(user)
    const result = await User.findOne()
    mongoose.disconnect();
    console.log(result)
  })
})
