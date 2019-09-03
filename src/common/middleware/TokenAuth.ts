import { lib } from '../modules'

const {AppError, Constant} = lib
import { TokenService } from '../service'

export async function tokenAuth (ctx, next) {
  const token = ctx.params.token || ctx.headers.token
  if (!token) {
    throw new AppError('请传入登录token')
  }
  let decoded = await TokenService.verify(token)
  if (!decoded || !decoded.userId) {
    throw new AppError('请重新登录', Constant.RESPONSE.AUTH_FAIL)
  }
  ctx.userId = decoded.userId
  await next()
}
