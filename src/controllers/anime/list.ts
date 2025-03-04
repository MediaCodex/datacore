import { Context } from 'koa'
import { Anime, AnimeI18n } from '../../models'
import { getPagination, urlQueryNumber, setPagination } from '../../helpers'

/**
 * Validators
 */

/**
 * Req/Res Types
 */
export type ListAnimeRequest = {}
export type ListAnimeResponse = Anime[]

/**
 * Business Logic
 */
export const handler = async (ctx: Context) => {
  const { limit, cursor } = getPagination(ctx)
  const offset = urlQueryNumber(cursor)

  // query db
  const { rows, count } = await Anime.findAndCountAll({
    limit,
    offset,

    include: [
      {
        model: AnimeI18n,
        where: { locale: 'en' },
        required: false
      }
    ]
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
