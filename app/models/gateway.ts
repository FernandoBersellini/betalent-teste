import { randomUUID } from 'node:crypto'
import { GatewaySchema } from '#database/schema'
import { beforeCreate, hasMany } from '@adonisjs/lucid/orm'
import Transaction from './transaction.ts'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Gateway extends GatewaySchema {
    static selfAssignPrimaryKey = true

    @beforeCreate()
    static assignUuid(gateway: Gateway) {
        if (!gateway.id) {
            gateway.id = randomUUID()
        }
    }

    @hasMany(() => Transaction)
    declare transactions: HasMany<typeof Transaction>
}