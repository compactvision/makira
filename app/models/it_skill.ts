import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Candidate from './candidate.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ItSkill extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare candidateId: number

  @column()
  declare name: string

  @column()
  declare lastUsed: Date | null

  @column()
  declare level: string | null

  @column()
  declare startDateYear: Date | null

  @column()
  declare startDateMonth: Date | null

  @belongsTo(() => Candidate)
  declare candidate: BelongsTo<typeof Candidate>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
