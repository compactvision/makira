// app/Models/Candidate.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import User from './user.js'

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
  declare photoUrl: string | null

  @column()
  declare about: string | null

  @column.date()
  declare birthDate: DateTime | null

  @column()
  declare resumeUrl: string | null

  // Tableaux typés
  @column({
    consume: (value) => value || [],
    prepare: (value) => value || [],
  })
  declare skills: string[]

  @column({
    consume: (value) => value || [],
    prepare: (value) => value || [],
  })
  declare education: Array<{
    nomComplexe: string
    startFormation: string // ISO date
    endFormation: string | null
    certificat: string
  }>

  @column({
    consume: (value) => value || [],
    prepare: (value) => value || [],
  })
  declare experience: Array<{
    company: string
    start: string // ISO date
    end: string | null
    description: string
  }>

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

  // Méthode pour ajouter une compétence
  public async addSkill(skill: string) {
    if (!this.skills.includes(skill)) {
      this.skills = [...this.skills, skill]
      await this.save()
    }
  }

  // Méthode pour ajouter une expérience
  public async addExperience(exp: {
    company: string
    start: string
    end: string | null
    description: string
  }) {
    this.experience = [...this.experience, exp]
    await this.save()
  }
}
