import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Scopes,
  Table
} from 'sequelize-typescript'
import { i18nModelScopes } from '../modelScopes'
import { Ratings } from '../validators'
import { Company } from './company'

export enum AnimeType {
  Series = 'series',
  Movie = 'movie'
}

export enum AnimeStatus {
  Planned = 'planned',
  Airing = 'airing',
  Completed = 'completed'
}

export enum AnimeSourceType {
  Original = 'original',
  Manga = 'manga',
  LightNovel = 'light-novel'
}

/**
 * Primary table
 */
@Table({
  tableName: 'anime',
  timestamps: true,
  underscored: true
})
@Scopes(() => ({ ...i18nModelScopes(AnimeI18n) }))
export class Anime extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string

  @AllowNull(true)
  @Column(DataType.STRING)
  synopsis?: string

  @AllowNull(false)
  @Column(DataType.STRING)
  type!: string

  // Only required for 'series'
  @AllowNull(true)
  @Column(DataType.INTEGER)
  episodes?: number

  @AllowNull(true)
  @Column(DataType.INTEGER)
  episode_duration?: number

  @AllowNull(false)
  @Column(DataType.STRING)
  status!: string

  @AllowNull(true)
  @Column(DataType.DATE)
  aired?: Date

  @AllowNull(true)
  @Column(DataType.DATE)
  premiered?: Date

  @AllowNull(false)
  @Column(DataType.STRING)
  source_type!: string

  // Only required for non-'original' source
  @AllowNull(true)
  @IsUUID(4)
  @Column(DataType.UUID)
  source_id?: string

  @AllowNull(true)
  @Column(DataType.ARRAY(DataType.UUID))
  genres?: string[]

  @AllowNull(false)
  @Column(DataType.INTEGER)
  total_duration!: number

  @AllowNull(false)
  @Column(DataType.JSONB)
  content_ratings!: Ratings

  /**
   * Virtual fields
   */
  private filterCompaniesByRole(role: string): Company[] {
    return (
      this.companies?.filter(
        (company) => company.AnimeCompany?.role === role
      ) || []
    )
  }

  get producers(): Company[] {
    return this.filterCompaniesByRole('producer')
  }

  get licensors(): Company[] {
    return this.filterCompaniesByRole('licensor')
  }

  get studios(): Company[] {
    return this.filterCompaniesByRole('studio')
  }

  /**
   * Relations
   */
  @HasMany(() => AnimeI18n)
  translations!: AnimeI18n[]

  @BelongsToMany(() => Company, () => AnimeCompany)
  companies!: Array<Company & { AnimeCompany: AnimeCompany }>
}

/**
 * Normalized data
 */
@Table({
  tableName: 'anime_i18n',
  timestamps: true,
  underscored: true
})
export class AnimeI18n extends Model {
  @PrimaryKey
  @ForeignKey(() => Anime)
  @Column(DataType.UUID)
  anime_id!: string

  @PrimaryKey
  @Column({
    type: 'enum_locales' // global ENUM type
  })
  locale!: string // ISO 639-1 language code

  @Column(DataType.STRING)
  slug!: string

  @Column(DataType.STRING)
  title!: string

  @Column(DataType.TEXT)
  synopsis?: string

  @BelongsTo(() => Anime)
  anime!: Anime
}

/**
 * Company pivot
 */
@Table({ tableName: 'anime_companies', timestamps: true, underscored: true })
export class AnimeCompany extends Model {
  @ForeignKey(() => Anime)
  @Column(DataType.UUID)
  anime_id!: string

  @ForeignKey(() => Company)
  @Column(DataType.UUID)
  companyId!: string

  @Column(DataType.ENUM('producer', 'licensor', 'studio'))
  role!: 'producer' | 'licensor' | 'studio'

  @BelongsTo(() => Anime)
  anime!: Anime

  @BelongsTo(() => Company)
  company!: Company
}

export default Anime
