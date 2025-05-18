// app/Models/Candidate.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import User from './user.js'
import Skill from './skill.js'
import Employment from './employment.js'
import Education from './education.js'
import ItSkill from './it_skill.js'

export default class Candidate extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare isActive: boolean

  // Tableaux typés
  @hasMany(() => Skill)
  declare skills: HasMany<typeof Skill>

  @hasMany(() => Employment)
  declare employments: HasMany<typeof Employment>

  @hasMany(() => Education)
  declare educations: HasMany<typeof Education>

  @hasMany(() => ItSkill)
  declare itSkills: HasMany<typeof ItSkill>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
