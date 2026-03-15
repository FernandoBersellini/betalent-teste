import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('client_id').references('id').inTable('clients').notNullable()
      table.uuid('gateway_id').references('id').inTable('gateways').notNullable()
      table.uuid('external_id').notNullable()
      table.enum('status', ['pending', 'paid', 'refunded', 'failed']).notNullable()
      table.integer('amount').notNullable()
      table.string('card_last_numbers').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}