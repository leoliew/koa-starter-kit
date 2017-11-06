import * as http from 'http'
import * as koaStatic from 'koa-static'
import * as bodyParser from 'koa-bodyparser'
import * as koaJson from 'koa-json'
import * as koaMorgan from 'koa-morgan'
import * as Koa from 'koa'
import ApiRouter from './router'

const app = new Koa()
const apiRouter = new ApiRouter()


// middleware
app.use(bodyParser())
app.use(koaJson())
app.use(koaMorgan('tiny', {
  skip: function (req, res) {
    return /\/docs\//.exec(req.url) || /\/healthcheck\//.exec(req.url)
  }
}))

buildRoutes(app)

// initializer
require('./initializer')

// statics
app.use(koaStatic('assets'))

const server = http.createServer(app.callback()).listen(3000)

function buildRoutes (app) {
  // routers
  const router = require('./router')
  // any router can be used, we support koa-router out of the box
  // bindRoutes(router, [HelloController])
  app.use(apiRouter.routes())
}

module.exports = server
