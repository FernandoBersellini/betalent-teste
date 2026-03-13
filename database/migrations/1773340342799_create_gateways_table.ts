import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'gateways'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.boolean('is_active')
      table.integer('priority')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}