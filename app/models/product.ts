import { ProductSchema } from '#database/schema'
import { manyToMany } from '@adonisjs/lucid/orm'
import Transaction from '#models/transaction'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Product extends ProductSchema {
    @manyToMany(() => Transaction)
    declare transactions: ManyToMany<typeof Transaction>
}