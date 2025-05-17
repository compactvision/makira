import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Candidate from './candidate.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class DesiredCareer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare candidateId: number

  @column()
  declare industry: string | null

  @column()
  declare functionalArea: string | null

  @column()
  declare role: string | null

  @column()
  declare jobType: string | null

  @column()
  declare employmentType: string | null

  @column()
  declare desiredShift: string | null

  @column()
  declare availabilityToJoin: Date | null

  @column()
  declare expectedSalary: string | null

  @column()
  declare desiredLocation: string | null

  @column()
  declare desiredIndustry: string | null

  @belongsTo(() => Candidate)
  declare candidate: BelongsTo<typeof Candidate>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
