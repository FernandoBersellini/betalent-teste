import { randomUUID } from 'node:crypto'
import { TransactionSchema } from '#database/schema'
import { beforeCreate, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import Client from './client.ts'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Gateway from './gateway.ts'
import Product from './product.ts'

export default class Transaction extends TransactionSchema {
    static selfAssignPrimaryKey = true

    @beforeCreate()
    static assignUuid(transaction: Transaction) {
        if (!transaction.id) {
            transaction.id = randomUUID()
        }
    }

    @belongsTo(() => Client)
    declare client: BelongsTo<typeof Client>

    @belongsTo(() => Gateway)
    declare gateway: BelongsTo<typeof Gateway>

    @manyToMany(() => Product)
    declare products: ManyToMany<typeof Product>
}
