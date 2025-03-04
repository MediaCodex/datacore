import { Sequelize, Model } from 'sequelize-typescript'
import { database } from '../config'
import { Anime, AnimeI18n } from './anime'
import { Company, CompanyI18n } from './company'
import { orArray } from '../helpers'

// module exports
export { Anime, AnimeI18n } from './anime'
export { Company, CompanyI18n } from './company'

// init helper
export const initDB = (): Sequelize => {
  return new Sequelize({
    dialect: 'postgres',
    host: database.host,
    database: database.database,
    username: database.username,
    password: database.password,
    models: [Company, CompanyI18n, Anime, AnimeI18n]
  })
}

