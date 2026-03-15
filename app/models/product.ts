import { randomUUID } from 'node:crypto'
import { ProductSchema } from '#database/schema'
import { beforeCreate, manyToMany } from '@adonisjs/lucid/orm'
import Transaction from '#models/transaction'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Product extends ProductSchema {
    static selfAssignPrimaryKey = true

    @beforeCreate()
    static assignUuid(product: Product) {
        if (!product.id) {
            product.id = randomUUID()
        }
    }

    @manyToMany(() => Transaction)
    declare transactions: ManyToMany<typeof Transaction>
}