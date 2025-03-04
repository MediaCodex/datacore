import Router from '@koa/router'
import Application from 'koa'
import { handler as listAnime } from './controllers/anime/list'
import { handler as showAnime } from './controllers/anime/show'
import { handler as listCompanies } from './controllers/companies/list'

export const bindRoutes = (app: Application) => {
  const router = new Router({ prefix: 'v1' })

  // anime
  router.use('/anime', listAnime)
  router.use('/anime/:id', showAnime)

  // companies
  router.use('/companies', listCompanies)

  // bind
  app.use(router.routes()).use(router.allowedMethods())
}
