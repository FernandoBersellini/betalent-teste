import type { HttpContext } from '@adonisjs/core/http'
import { purchaseValidator } from '#validators/purchase'
import Client from '#models/client'
import { GatewayManager } from '#services/gateway_manager'
import { randomUUID } from 'crypto'
import Transaction from '#models/transaction'
import db from '@adonisjs/lucid/services/db'

export default class PurchasesController {
    async store({ request, response }: HttpContext) {
        const data = await purchaseValidator.validate(request.all())

        const gatewayManager = new GatewayManager()
        const { result, gatewayId } = await gatewayManager.processPayment({
            clientId: '',
            amount: data.amount,
            name: data.name,
            email: data.email,
            cardNumber: data.cardNumber,
            cvv: data.cvv,
        })

        const transaction = await db.transaction(async (trx) => {
            const client = await Client.firstOrCreate(
                { email: data.email },
                { id: randomUUID(), name: data.name },
                { client: trx }
            )

            const tx = await Transaction.create(
                {
                    id: randomUUID(),
                    externalId: result.externalId,
                    gatewayId: gatewayId,
                    clientId: client.id,
                    status: result.transactionStatus,
                    amount: data.amount,
                    cardLastNumbers: result.cardLastNumbers,
                },
                { client: trx }
            )

            return tx
        })

        return response.status(201).json({
            id: transaction.id,
            status: transaction.status,
            externalId: transaction.externalId,
            gatewayId: transaction.gatewayId,
            amount: transaction.amount,
            cardLastNumbers: transaction.cardLastNumbers,
            clientId: transaction.clientId,
        })
    }
}
