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

      table.string('nom', 80).nullable()
      table.string('prenom', 80).nullable()
      table.string('phone', 20).nullable()
      table.string('poste').nullable()
      table.string('sex').nullable()
      table.string('status').nullable()
      table.string('summary').nullable()
      table.text('address').nullable()
      table.string('photo_url', 255).nullable()
      table.text('about').nullable()
      table.date('birth_date').nullable()
      table.string('resume_url', 255).nullable()
      table.text('skills').nullable()

      // Colonnes JSONB avec valeurs par défaut correctes
      table.jsonb('employment').notNullable().defaultTo(JSON.stringify([]))
      table.jsonb('project').notNullable().defaultTo(JSON.stringify([]))
      table.jsonb('education').notNullable().defaultTo(JSON.stringify([]))
      table.jsonb('experience').notNullable().defaultTo(JSON.stringify([]))
      table.jsonb('languages').notNullable().defaultTo(JSON.stringify([]))
      table.jsonb('social_links').notNullable().defaultTo(JSON.stringify([]))

      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable()

      // Index standards
      table.index(['user_id'])
      table.index(['nom', 'prenom'])
    })

    // Étape 2: Créer les index GIN dans une transaction séparée
    await this.defer(async (db) => {
      await db.rawQuery(`
        CREATE INDEX idx_candidate_languages ON candidates USING GIN (languages jsonb_path_ops)
      `)
    })
  }

  async down() {
    // Supprimer les index d'abord
    await this.schema.raw('DROP INDEX IF EXISTS idx_candidate_languages')

    // Puis supprimer la table
    this.schema.dropTable(this.tableName)
  }
}
