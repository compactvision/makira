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

  // Informations personnelles
  @column()
  declare nom: string

  @column()
  declare prenom: string

  @column()
  declare phone: string

  @column()
  declare address: string

  @column()
  declare poste: string

  @column()
  declare sex: string

  @column()
  declare status: string

  @column()
  declare summary: string

  @column()
  declare photoUrl: string | null

  @column()
  declare about: string | null

  @column.date()
  declare birthDate: DateTime | null

  @column()
  declare resumeUrl: string | null

  // Tableaux typés
  @hasMany(() => Skill)
  declare skills: HasMany<typeof Skill>

  @hasMany(() => Employment)
  declare employments: HasMany<typeof Employment>

  @hasMany(() => Education)
  declare educations: HasMany<typeof Education>

  @hasMany(() => ItSkill)
  declare itSkills: HasMany<typeof ItSkill>

  @column({
    consume: (value) => value || [],
    prepare: (value) => value || [],
  })
  declare languages: Array<{
    nom: string
    niveau: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'natif'
  }>

  @column({
    consume: (value) => value || [],
    prepare: (value) => value || [],
  })
  declare socialLinks: Array<{
    reseau: string
    lien: string
  }>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
