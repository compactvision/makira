import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Candidate from './candidate.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Education extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare candidateId: number

  @column()
  declare school: string

  @column()
  declare degree: string

  @column()
  declare fieldOfStudy: string

  @column()
  declare startDate: string

  @column()
  declare endDate: string

  @column()
  declare description: string

  @column()
  declare isCurrent: boolean

  @belongsTo(() => Candidate)
  declare candidate: BelongsTo<typeof Candidate>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
