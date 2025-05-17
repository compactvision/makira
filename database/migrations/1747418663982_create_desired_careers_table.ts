import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'desired_careers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('candidate_id')
        .unsigned()
        .references('id')
        .inTable('candidates')
        .onDelete('CASCADE')
      table.string('industry', 255).nullable()
      table.string('functional_area', 255).nullable()
      table.string('role', 255).nullable()
      table.string('job_type', 50).nullable()
      table.string('employment_type', 50).nullable()
      table.string('desired_shift', 255).nullable()
      table.date('availability_to_join').nullable()
      table.string('expected_salary', 50).nullable()
      table.string('desired_location', 255).nullable()
      table.string('desired_industry', 255).nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
