import * as KoaRouter from 'koa-router'
import * as UserController from './user/controllers/UserController'


export default class ApiRouter extends KoaRouter {
  public constructor() {
    super({ prefix: '/api/v1' });
    this.setupRoutes();
  }

  /**
   * Initialize routes
   */
  public setupRoutes = (): void => {
    this.get('/user/getUserByName/:name', UserController.getUserByName)
    this.post('/user', UserController.save)
  }
}




// const responseFormatter = require('./common/middleware/ResponseFormatter')
// router.use('/', responseFormatter('^/api'))

/**
 * @apiDefine requestId
 * @apiParam {String} [requestId]  流水号，有传值则校验唯一.
 */

/**
 * @apiDefine appOrderId
 * @apiParam {String} [appOrderId] APP 请求订单号，用户对账 可传可不传.
 */

/**
 * @apiDefine userId
 * @apiParam {String} userId 用户ID.
 */

/**
 * @apiDefine noteId
 * @apiParam {String} noteId 标的 ID，查询可投标的接口获得.
 */

/**
 * @apiDefine returnUrl
 * @apiParam {String} returnUrl 同步返回地址
 */

/**
 * @apiDefine notifyUrl
 * @apiParam {String} notifyUrl 异步回调地址
 */

/**
 * @apiDefine response
 * @apiSuccess {Number} code 0 代表成功，非 0 则表示失败
 * @apiSuccess {String} message  提示信息
 * @apiSuccess {Object} data   返回结果
 */

/**
 * @apiDefine responseExample
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code" : 0
 *      "data" : {}
 *    }
 */

/**
 * @api {*} * 返回值格式
 * @apiDescription 返回值格式
 * @apiName response
 * @apiGroup Common
 *
 * @apiUse response
 * @apiUse responseExample
 */
