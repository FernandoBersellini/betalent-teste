import type { HttpContext } from '@adonisjs/core/http'

import Client from "#models/client"

export default class ClientsController {
    async index() {
        const clients = await Client.all()
        return clients
    }

    async show({ params }: HttpContext) {
        const client = await Client.query().where('id', params.id).preload('transactions').firstOrFail()
        return client
    }
}