const http = require('http')
const serve = require('koa-static')
const koa = require('koa')
const app = new koa()
app.use(async (ctx, next) => {
  const start = new Date;
  console.log(`Started at: ${start}`);
  await next();
  const ms = new Date - start;
  console.log(`Elapsed: ${ms}ms`);
});



//
//
// // x-response-time
// app.use(function *(next){
//   // (1) 进入路由
//   var start = new Date;
//   yield next;
//   // (5) 再次进入 x-response-time 中间件，记录2次通过此中间件「穿越」的时间
//   var ms = new Date - start;
//   this.set('X-Response-Time', ms + 'ms');
//   // (6) 返回 this.body
// });

// logger
app.use(async (ctx, next) =>{
  // (2) 进入 logger 中间件
  const start = new Date;
  await next();
  // (4) 再次进入 logger 中间件，记录2次通过此中间件「穿越」的时间
  const ms = new Date - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

// app.use(async (ctx) => {
//   ctx.body = 'Hello world';
// });

buildRoutes(app)
// statics
app.use(serve('assets'))

const server = http.createServer(app.callback()).listen(3000)

// const port = config.get('port')
// if (!module.parent) {
//   server.
// }

function buildRoutes (app) {
  // routers
  const router = require('./app/router')
  // any router can be used, we support koa-router out of the box
  // bindRoutes(router, [HelloController])
  app.use(router.routes(), router.allowedMethods())
}

module.exports = server
