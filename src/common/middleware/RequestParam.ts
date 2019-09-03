import * as _ from 'lodash'

export async function translate (ctx, next) {
  // 把APP设置到header
  ctx.state.app = ctx.headers.app
  ctx.params = Object.assign({}, ctx.query, ctx.params, ctx.request.body)
  await next()
}
