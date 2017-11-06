import * as UserController from './controllers/UserController'

export function router (router) {
  router.get('/user/getUserByName/:name', UserController.getUserByName)
  router.post('/user', UserController.save)
}
