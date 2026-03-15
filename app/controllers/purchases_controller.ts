import type { HttpContext } from '@adonisjs/core/http'
import { purchaseValidator } from '#validators/purchase'
import Client from '#models/client'
import { GatewayManager } from '#services/gateway_manager'
import Transaction from '#models/transaction'
import db from '@adonisjs/lucid/services/db'
import Product from '#models/product'
import TransactionProduct from '#models/transaction_product'

export default class PurchasesController {
    async store({ request, response }: HttpContext) {
        const data = await purchaseValidator.validate(request.all())
        const client = await Client.firstOrCreate(
            { email: data.email },
            { name: data.name },
        )

        let totalAmount = 0
        const itemsWithPrice: { productId: string; quantity: number; price: number }[] = []

        for (const item of data.items) {
            const product = await Product.findOrFail(item.productId)
            const price = product.amount ?? 1
            totalAmount += price * item.quantity
            itemsWithPrice.push({
                ...item,
                price
            })
        }

        const gatewayManager = new GatewayManager()
        const { result, gatewayId } = await gatewayManager.processPayment({
            clientId: client.id,
            amount: totalAmount,
            name: data.name,
            email: data.email,
            cardNumber: data.cardNumber,
            cvv: data.cvv,
        })

        const transaction = await db.transaction(async (trx) => {
            const tx = await Transaction.create(
                {
                    externalId: result.externalId,
                    gatewayId: gatewayId,
                    clientId: client.id,
                    status: result.transactionStatus,
                    amount: totalAmount,
                    cardLastNumbers: result.cardLastNumbers,
                },
                { client: trx }
            )

            await TransactionProduct.createMany(
                itemsWithPrice.map((item) => ({
                    transactionId: tx.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                })),
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
