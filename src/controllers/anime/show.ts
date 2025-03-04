import { Context } from 'koa'
import {
  errorResponse,
  getLocale,
  idOrSlug,
  orArray,
  urlQueryBoolean
} from '../../helpers'
import { Anime, AnimeI18n, Company, CompanyI18n } from '../../models'
import { where } from 'sequelize'
import { i18nScopes } from '../../modelScopes'

/**
 * Validators
 */

/**
 * Req/Res Types
 */
export type ListCompaniesRequest = {}
export type ListCompaniesResponse = Anime

/**
 * Business Logic
 */
export const handler = async (ctx: Context) => {
  const allowSlug = urlQueryBoolean(ctx.query.slug)
  const locales = getLocale(ctx)

  // extract ID
  const { id } = ctx.params
  if (!id) {
    ctx.throw('ID or slug not provided', 400)
  }

  // search by ID
  const anime = await Anime.scope(...i18nScopes(locales)).findOne({
    where: idOrSlug(id, allowSlug),
    include: [
      {
        model: Company,
        through: { attributes: ['role'] },
        include: [
          {
            model: CompanyI18n,
            where: orArray('locale', locales),
            attributes: ['id', 'name', 'slug']
          }
        ]
      }
    ]
  })
  if (!anime) {
    ctx.throw('anime not found', 404)
  }

  // success
  ctx.status = 200
  ctx.body = anime
}
