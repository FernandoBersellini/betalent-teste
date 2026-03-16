import { randomUUID } from 'node:crypto'
import { UserSchema } from '#database/schema'
import { beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { AccessToken } from '@adonisjs/auth/access_tokens'
import Client from '#models/client'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class User extends UserSchema {
    static selfAssignPrimaryKey = true

    declare currentAccessToken?: AccessToken

    @beforeCreate()
    static assignUuid(user: User) {
        if (!user.id) {
            user.id = randomUUID()
        }
    }

    @belongsTo(() => Client)
    declare client: BelongsTo<typeof Client>

    static accessTokens = DbAccessTokensProvider.forModel(User)
}
