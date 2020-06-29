import { BaseProxy } from './BaseProxy'
import { Constant, AppError, Logger } from '../lib'

export class GithubProxy extends BaseProxy {
  public baseUrl

  constructor () {
    super()
    this.name = 'github'
    this.baseUrl = 'https://api.github.com'
  }

  async userInfo ({username}: { username: string}) {
    const resp = await this.get({
      url: `${this.baseUrl}/users/${username}`,
      query: {},
      header: {},
      skipLog: false
    }) as any
    if (!resp) {
      throw new AppError(`get userInfo fails`)
    }
    return resp
  }
}
