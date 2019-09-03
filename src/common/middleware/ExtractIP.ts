import * as _ from 'lodash'

export async function ExtractIP (ctx, next) {
  let ip = _.isString(ctx.request.headers['x-forwarded-for']) ? ctx.request.headers['x-forwarded-for'].replace(/\s+/g, '').split(',')[0] : ctx.request.ip
  ctx.state.ip = ip
  await next()
}
