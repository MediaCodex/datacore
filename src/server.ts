import Koa from 'koa'
import Router from '@koa/router'
import { initDB } from './models'
import { webserver } from './config'
import { bodyParser } from '@koa/bodyparser'
import { bindRoutes } from './router'

const startServer = () => {
  // init koa
  const app = new Koa()
  app.context.db = initDB()

  // middleware
  app.use(bodyParser())

  // start listener
  bindRoutes(app)
  app.listen(webserver.port, webserver.host)
}

startServer()
