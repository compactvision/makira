import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Candidate from './candidate.js'

export default class Employment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare company: string

  @column()
  declare position: string

  @column()
  declare start_date: string

  @column()
  declare end_date: string

  @column()
  declare description: string

  @column()
  declare is_current: boolean

  @column()
  declare candidateId: number

  @belongsTo(() => Candidate)
  declare candidate: BelongsTo<typeof Candidate>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
