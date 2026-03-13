import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaction_products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('transaction_id').unsigned().references('id').inTable('transactions').notNullable()
      table.integer('product_id').unsigned().references('id').inTable('products').notNullable()
      table.integer('quantity').notNullable()
      table.integer('price').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}