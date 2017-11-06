import { UserBaseService } from '../service/UserBaseService'

/**
 * getUserByName
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getUserByName (ctx) {
  const {name} = ctx.params
  ctx.body = await UserBaseService.getUserByName(name)
}

export async function save (ctx) {
  const user = ctx.request.body
  ctx.body = await UserBaseService.save(user)
}
