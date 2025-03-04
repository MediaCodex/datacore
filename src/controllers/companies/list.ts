import { Context } from 'koa'
import { getPagination, urlQueryNumber, setPagination } from '../../helpers'
import { Company } from '../../models'

/**
 * Req/Res Types
 */
export type ListCompaniesRequest = {}
export type ListCompaniesResponse = Company[]

/**
 * Business Logic
 */
export const handler = async (ctx: Context) => {
  const { limit, cursor } = getPagination(ctx)
  const offset = urlQueryNumber(cursor)

  // query db
  const { rows, count } = await Company.findAndCountAll({
    limit,
    offset
  })

  // set response
  ctx.status = 200
  ctx.body = rows
  setPagination(ctx, limit, {
    offset: offset ?? 0,
    rows: rows.length,
    total: count
  })
}
