import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
  Default,
  BelongsToMany
} from 'sequelize-typescript'

@Table({
  tableName: 'people',
  timestamps: true,
  underscored: true
})
export class Person extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string

  @AllowNull(false)
  @Column(DataType.STRING)
  slug!: string

}
