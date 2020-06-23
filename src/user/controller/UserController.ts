import { registerAndLoginService } from '../service'
import { lib } from '../modules'

const {Joi, AppError} = lib

/**
 * 发送验证码
 * @param ctx
 */
export async function sendLoginCode (ctx) {
  const {mobileNumber} = ctx.params
  // 多语言demo
  const schema = Joi.object().keys({
    mobileNumber: Joi.string().required().regex(/^1[34578]\d{9}$/).error(new AppError(ctx.i18n('mobile_number_format_error')))
  })
  const param = {mobileNumber}
  const value = Joi.validate(param, schema)
  ctx.body = await registerAndLoginService.sendLoginCode(value)
}

/**
 * 通过验证码登录
 * @param ctx
 */
export async function loginByCode (ctx) {
  const {mobileNumber, code} = ctx.params
  const schema = Joi.object().keys({
    mobileNumber: Joi.string().required().regex(/^1[34578]\d{9}$/).error(new AppError('Invalid mobileNumber')),
    code: Joi.string().required().length(6).error(new AppError('Invalid code'))
  })
  const param = {mobileNumber, code}
  const value = Joi.validate(param, schema)
  ctx.body = await registerAndLoginService.loginByCode(value)
}
