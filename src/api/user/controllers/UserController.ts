import {UserBaseService} from "../service/UserBaseService"

/**
 * getUserByName
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getUserByName (ctx) {
  console.log(ctx.params)
  const {name} = ctx.params
  ctx.body = await UserBaseService.getUserByName(name)
}

export async function save(ctx){
  const user = ctx.body
  //TODO: body parser
  console.log(ctx.params)
  ctx.body = await UserBaseService.save(user)
}
