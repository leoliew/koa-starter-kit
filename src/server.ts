const http = require('http')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const morgan = require('koa-morgan')
const koa = require('koa')
const app = new koa()

// middleware
app.use(bodyParser())
app.use(json())
app.use(morgan('tiny', {
  skip: function (req, res) {
    return /\/docs\//.exec(req.url) || /\/healthcheck\//.exec(req.url)
  }
}))

buildRoutes(app)

// initializer
require('./config/initializer')

// statics
app.use(serve('assets'))

const server = http.createServer(app.callback()).listen(3000)

function buildRoutes (app) {
  // routers
  const router = require('./app/router')
  // any router can be used, we support koa-router out of the box
  // bindRoutes(router, [HelloController])
  app.use(router.routes(), router.allowedMethods())
}

module.exports = server
