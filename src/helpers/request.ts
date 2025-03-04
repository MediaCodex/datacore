import { Context } from 'koa'
import iso639_1 from '../../data/iso639.json'

/**
 * URL Query
 */
type QueryOrHeader = Context['query'][0] | Context['header'][0]

export const urlQueryString = (query: QueryOrHeader): string | undefined => {
  if (Array.isArray(query)) {
    return query[0]
  }
  return query
}

export const urlQueryNumber = (query: QueryOrHeader): number | undefined => {
  if (Array.isArray(query)) {
    query = query[0]
  }

  if (query === undefined) {
    return query
  }

  try {
    const num = Number(query)
    if (!Number.isSafeInteger(num)) return undefined
    return num
  } catch (err) {
    console.info(`Failed to parse query int: ${query}`)
    return undefined
  }
}

export const urlQueryBoolean = (query: QueryOrHeader): boolean => {
  if (Array.isArray(query)) {
    query = query[0]
  }

  const safeQuery = query?.toLowerCase()
  if (safeQuery === 'true' || safeQuery === '1') {
    return true
  }

  return false
}

/**
 * Misc.
 */
export const getLocale = (ctx: Context): string[] => {
  const iso639: Record<string, string[]> = iso639_1

  // convert "en-US" to "en"
  const trimLocale = (locale: string) => locale.trim().split('-')[0]

  // try to get locale from query string
  const query = urlQueryString(ctx.query.locale ?? ctx.query.lang)
  if (query !== undefined) {
    const baseQuery = trimLocale(query)
    return [...new Set([baseQuery, ...iso639[baseQuery]])]
  }

  // parse Accept-Language header with quality values
  const parseAcceptLanguage = (header: string) => {
    return header
      .split(',')
      .map((part) => {
        const [locale, qValue] = part.split(';')
        const quality = qValue ? parseFloat(qValue.split('=')[1]) : 1.0
        return { locale: trimLocale(locale), quality }
      })
      .filter((entry) => Object.keys(iso639).includes(entry.locale))
      .sort((a, b) => b.quality - a.quality)
      .map((entry) => entry.locale)
  }

  // try to get locale from standard HTTP headers
  const locales: string[] = []
  const acceptLanguage = ctx.get('accept-language')
  if (acceptLanguage !== "") {
    const headerLocales = parseAcceptLanguage(acceptLanguage)
    for (const locale of headerLocales) {
      if (Object.keys(iso639).includes(locale) && !locales.includes(locale)) {
        locales.push(locale, ...iso639[locale])
      }
    }
  }

  // add fallback locale if no valid locales were found
  if (locales.length === 0) {
    locales.push(...iso639['en'])
  }

  // deduplicate while maintaining order
  return [...new Set(locales)]
}
