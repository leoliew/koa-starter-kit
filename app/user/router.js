
function router(router) {
  router.get('/', async (ctx) => {
    ctx.body = {'Hello': 'world'};
  })
}

exports.router = router;
