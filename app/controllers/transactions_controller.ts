import type { HttpContext } from '@adonisjs/core/http'

import Transaction from "#models/transaction"
import { GatewayManager } from '#services/gateway_manager'

export default class TransactionsController {
    private gatewayManager: GatewayManager

    constructor() {
        this.gatewayManager = new GatewayManager()
    }

    async index() {
        const transactions = await Transaction.all()
        return transactions
    }

    async show({ params }: HttpContext) {
        const transaction = await Transaction.query().where('id', params.id).preload('client').preload('gateway').firstOrFail()
        return transaction
    }

    async refund({ params }: HttpContext) {
        const transaction = await Transaction.query().where('id', params.id).preload('client').preload('gateway').firstOrFail()
        this.gatewayManager.processRefund(transaction.externalId, transaction.gatewayId)
        transaction.status = 'refunded'
        await transaction.save()
        return transaction
        
    }
}