import { Context } from 'koa'
import { pagination } from '../config'
import { urlQueryNumber, urlQueryString } from './request'

export const getPagination = (
  ctx: Context,
  maxLimit?: number
): { limit: number; cursor?: string } => {
  // get from query
  const queryLimit = urlQueryNumber(ctx.query.limit)
  const queryCursor = urlQueryString(ctx.query.cursor)

  // get from headers
  const headerLimit = urlQueryNumber(ctx.headers['x-pagination-limit'])
  const headerCursor = urlQueryString(ctx.headers['x-pagination-cursor'])

  const limit = queryLimit ?? headerLimit ?? pagination.defaultLimit
  return {
    // force the limit to be between 1 and maximum
    limit: Math.min(Math.max(limit, 1), maxLimit ?? pagination.maxLimit),
    cursor: queryCursor ?? headerCursor
  }
}

export const setPagination = (
  ctx: Context,
  limit: number,
  cursor?: string | { offset: number; rows: number; total: number }
): void => {
  if (typeof cursor === 'object') {
    cursor =
      cursor.offset + cursor.rows < cursor.total
        ? (cursor.offset + cursor.rows).toString(10)
        : undefined
  }

  ctx.set('X-Pagination-Limit', limit.toString())
  if (cursor) {
    ctx.set('X-Pagination-Cursor', cursor)
  }
}
