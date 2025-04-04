import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'candidates'

  async up() {
    // Étape 1: Créer la table sans les index GIN
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.string('nom', 80).notNullable()
      table.string('prenom', 80).notNullable()
      table.string('phone', 20).notNullable()
      table.text('address').notNullable()
      table.string('photo_url', 255).nullable()
      table.text('about').nullable()
      table.date('birth_date').nullable()
      table.string('resume_url', 255).nullable()

      // Colonnes JSONB avec valeurs par défaut correctes
      table.jsonb('skills').notNullable().defaultTo(JSON.stringify([]))
      table.jsonb('education').notNullable().defaultTo(JSON.stringify([]))
      table.jsonb('experience').notNullable().defaultTo(JSON.stringify([]))
      table.jsonb('languages').notNullable().defaultTo(JSON.stringify([]))
      table.jsonb('social_links').notNullable().defaultTo(JSON.stringify([]))

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()

      // Index standards
      table.index(['user_id'])
      table.index(['nom', 'prenom'])
    })

    // Étape 2: Créer les index GIN dans une transaction séparée
    await this.defer(async (db) => {
      await db.rawQuery(`
        CREATE INDEX idx_candidate_skills ON candidates USING GIN (skills jsonb_path_ops)
      `)
      await db.rawQuery(`
        CREATE INDEX idx_candidate_languages ON candidates USING GIN (languages jsonb_path_ops)
      `)
    })
  }

  async down() {
    // Supprimer les index d'abord
    await this.schema.raw('DROP INDEX IF EXISTS idx_candidate_skills')
    await this.schema.raw('DROP INDEX IF EXISTS idx_candidate_languages')

    // Puis supprimer la table
    this.schema.dropTable(this.tableName)
  }
}
