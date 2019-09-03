import * as UserController from './controller/UserController'
import { common } from './modules'

const RequestLog = common.middleware.RequestLog

export function router (router) {
  router.post('/user/sendLoginCode', UserController.sendLoginCode)
  router.post('/user/loginByCode', UserController.loginByCode)
}
