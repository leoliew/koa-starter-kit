import * as http from 'http'
import * as koaStatic from 'koa-static'
import * as bodyParser from 'koa-bodyparser'
import * as koaJson from 'koa-json'
import * as koaMorgan from 'koa-morgan'
import * as config from 'config'
import * as Koa from 'koa'
import ApiRouter from './router'
import Logger from './lib/Logger'
import * as KoaRouter from 'koa-router'
import * as locales from 'koa-locales'

const indexRouter = new KoaRouter()

const app = new Koa()
const apiRouter = new ApiRouter()
const port = config.get('port')
const time = Date.now()

// middleware
app.use(bodyParser({
  extendTypes: {
    text: ['application/xml', 'text/xml']
  },
  enableTypes: ['text', 'json', 'form']
}))
app.use(koaJson())
app.use(koaMorgan('tiny', {
  skip: function (req, res) {
    return /docs/.exec(req.url) || /health/.exec(req.url)
  }
}))

buildRoutes(app)
i18N(app)

// initializer
require('./connection')

// statics
app.use(koaStatic('assets'))

Logger.info(` app star in ${process.env.NODE_ENV || 'local'} env `)
Logger.info(` app star in ${(Date.now() - time) / 1000} s, listen on port ${port}`)

const server = http.createServer(app.callback()).listen(port)

// router middleware
function buildRoutes (app) {
  // routers
  // const router = require('./router')
  // any router can be used, we support koa-router out of the box
  // bindRoutes(router, [HelloController])
  app.use(indexRouter.routes())
  app.use(apiRouter.routes())
}

// i18n middleware
function i18N (app) {
  const options = {
    dirs: [__dirname + '/lib/locales'],
    defaultLocale: 'en-US',
    functionName: 'i18n'
  }
  locales(app, options)
}

export default server
