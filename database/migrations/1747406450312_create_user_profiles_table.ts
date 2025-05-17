import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('name').nullable()
      table.string('phone').nullable()
      table.string('email').nullable()
      table.string('website').nullable()
      table.string('qualification').nullable()
      table.string('language').nullable()
      table.string('job_category').nullable()
      table.string('experience').nullable()
      table.string('current_salary').nullable()
      table.string('expected_salary').nullable()
      table.integer('age').nullable()
      table.string('country').nullable()
      table.string('city').nullable()
      table.string('postcode').nullable()
      table.text('address').nullable()
      table.text('description').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
