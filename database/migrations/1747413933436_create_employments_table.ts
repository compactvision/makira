import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'employments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('candidate_id')
        .unsigned()
        .references('id')
        .inTable('candidates')
        .onDelete('CASCADE')
      table.string('company').notNullable()
      table.string('position').notNullable()
      table.string('start_date').notNullable()
      table.string('end_date').notNullable()
      table.string('description').notNullable()
      table.boolean('is_current').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
