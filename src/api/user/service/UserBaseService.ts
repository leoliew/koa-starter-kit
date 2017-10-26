

import {User} from "../model/User"

export class UserBaseService {

  static async getUserByName (name: string) {
    return await User.findOne({name: name})
  }

  static async save (user: object) {
    const result = await User.insertMany(user)
    console.log(result)
    return result
  }
}
