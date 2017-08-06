export function router (router) {
  router.all('/', async (ctx) => {
    console.log(ctx.request.body)
    ctx.body = {'Hello': 'world'}
  })
}
