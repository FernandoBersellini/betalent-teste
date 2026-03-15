import { randomUUID } from 'node:crypto'
import { ClientSchema } from '#database/schema'
import { beforeCreate, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Transaction from '#models/transaction'

export default class Client extends ClientSchema {
    static selfAssignPrimaryKey = true

    @beforeCreate()
    static assignUuid(client: Client) {
        if (!client.id) {
            client.id = randomUUID()
        }
    }

    @hasMany(() => Transaction)
    declare transactions: HasMany<typeof Transaction>
}