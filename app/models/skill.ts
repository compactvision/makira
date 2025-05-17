import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Candidate from './candidate.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Skill extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare candidateId: number

  @belongsTo(() => Candidate)
  declare candidate: BelongsTo<typeof Candidate>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
