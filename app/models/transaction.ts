import { TransactionSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Client from './client.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Transaction extends TransactionSchema {
    @belongsTo(() => Client)
    declare client: BelongsTo<typeof Client>
}