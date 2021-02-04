import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class AppConfig extends BaseModel {
  public static table = 'app_configs'

  @column({ isPrimary: true })
  public id: number

  @column()
  public key: string

  @column()
  public title: string

  @column()
  public description?: string

  @column()
  public type: string

  @column()
  public value: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
