import * as KoaRouter from 'koa-router'

export default class ApiRouter extends KoaRouter {
  public constructor () {
    super({prefix: '/api/v1'})
    this.setupRoutes()
  }

  /**
   * Initialize routes
   */
  public setupRoutes = (): void => {
    require('./user/router').router(this)
  }
}
