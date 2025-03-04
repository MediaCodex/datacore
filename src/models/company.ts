import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'
import { Anime, AnimeCompany } from './anime'

/**
 * Primary table
 */
@Table({
  tableName: 'companies',
  timestamps: true,
  underscored: true
})
export class Company extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string

  @Column(DataType.STRING)
  website?: string

  @Column(DataType.STRING)
  headquarters?: string

  @Column(DataType.DATEONLY)
  founded?: string

  @Column(DataType.DATEONLY)
  defunct?: string

  @ForeignKey(() => Company)
  @Column(DataType.UUID)
  parentId?: string

  /**
   * Relations
   */
  @HasMany(() => CompanyI18n)
  translations!: CompanyI18n[]

  @BelongsToMany(() => Anime, () => AnimeCompany)
  companies!: Company[]
}

/**
 * Normalized data
 */
@Table({
  tableName: 'company_i18n',
  timestamps: true,
  underscored: true
})
export class CompanyI18n extends Model {
  @PrimaryKey
  @ForeignKey(() => Company)
  @Column(DataType.UUID)
  anime_id!: string

  @PrimaryKey
  @Column({
    type: 'enum_locales'
  })
  locale!: string

  @Column(DataType.STRING)
  slug!: string

  @Column(DataType.STRING)
  name!: string

  @Column(DataType.TEXT)
  description?: string

  @BelongsTo(() => Company)
  company!: Company
}
