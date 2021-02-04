import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Folder from './Folder'
import User from './User'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public uuid: string

  @column()
  public description?: string

  @column()
  public mimeType: string

  @column()
  public path: string

  @column()
  public size: number

  @column()
  public filename: string

  @column()
  public urlExternal?: string

  @column()
  public urlWebview?: string

  @column()
  public originalFilename?: string

  @column()
  public folderId: number

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Folder, {
    foreignKey: 'folderId',
    localKey: 'id',
  })
  public folder: BelongsTo<typeof Folder>

  @belongsTo(() => User, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  public user: BelongsTo<typeof User>
}
