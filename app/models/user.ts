import { randomUUID } from 'node:crypto'
import { UserSchema } from '#database/schema'
import { beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import Client from '#models/client'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class User extends UserSchema {
    static selfAssignPrimaryKey = true

    @beforeCreate()
    static assignUuid(user: User) {
        if (!user.id) {
            user.id = randomUUID()
        }
    }

    @belongsTo(() => Client)
    declare client: BelongsTo<typeof Client>
}