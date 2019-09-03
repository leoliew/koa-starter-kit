import * as _ from 'lodash'

export async function log (ctx, next) {
  ctx.isLogSave = true
  await next()
}
