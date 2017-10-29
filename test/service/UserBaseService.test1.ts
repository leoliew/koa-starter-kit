

// const {UserBaseService} = require('../../dist/api/user/service/UserBaseService')

import {UserBaseService} from '../../src/api/user/service/UserBaseService'

// const {User} = require ('../../dist/api/user/model/User')
// const helper = require('../helper')
require('should')

describe('UserBaseService Test', () => {
  it ('save user!' , async () => {
      const user = {
        phone: "13242890088",
        name: 'leo'
      }
      await UserBaseService.save(user)
      // const result = await User.findOne()
      // console.log(result)
  }

  )
});
