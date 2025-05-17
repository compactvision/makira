import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import User from './user.js'

export default class UserProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare name: string

  @column()
  declare phone: string

  @column()
  declare email: string

  @column()
  declare website: string

  @column()
  declare qualification: string

  @column()
  declare language: string

  @column()
  declare jobCategory: string

  @column()
  declare experience: string

  @column()
  declare currentSalary: string

  @column()
  declare expectedSalary: string

  @column()
  declare age: number

  @column()
  declare country: string

  @column()
  declare city: string

  @column()
  declare postcode: string

  @column()
  declare address: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>
}
