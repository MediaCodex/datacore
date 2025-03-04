import { Response } from 'koa'

export type APIRequest<Body, Params = {}, Query = {}, Headers = {}> = {
  params: Params
  query: Query
  headers: Headers
  body: Body
}
