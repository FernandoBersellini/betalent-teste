import { randomUUID } from 'node:crypto'
import { TransactionProductSchema } from '#database/schema'
import { beforeCreate } from '@adonisjs/lucid/orm'

export default class TransactionProduct extends TransactionProductSchema {
    static selfAssignPrimaryKey = true

    @beforeCreate()
    static assignUuid(transactionProduct: TransactionProduct) {
        if (!transactionProduct.id) {
            transactionProduct.id = randomUUID()
        }
    }
}