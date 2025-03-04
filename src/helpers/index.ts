import { Context } from 'koa'

export * from './pagination'
export * from './query'
export * from './request'

export const errorResponse = (ctx: Context, code: number, message?: string) => {
  ctx.status = code
  ctx.body = {
    statusCode: code,
    message: message
  }
  return
}

export const isUuid = (id: string): boolean => {
  const re =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return re.test(id)
}
