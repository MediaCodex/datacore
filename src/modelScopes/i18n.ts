import { orArray } from '../helpers'

export const i18nModelScopes = (model: any) => ({
  localeI18n: (locales: string[]) => ({
    include: [
      {
        model: model,
        as: 'localeI18n',
        where: orArray('locale', locales)
      }
    ]
  }),
  availableLocales: {
    include: [
      {
        model: model,
        as: 'availableLocales',
        attributes: ['locale']
      }
    ]
  }
})

export const i18nScopes = (locales: string[]) => [
  { method: ['localeI18n', locales] },
  'availableLocales'
]
