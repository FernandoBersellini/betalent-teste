import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaction_products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('transaction_id').references('id').inTable('transactions').notNullable()
      table.uuid('product_id').references('id').inTable('products').notNullable()
      table.integer('quantity').notNullable()
      table.integer('price').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}