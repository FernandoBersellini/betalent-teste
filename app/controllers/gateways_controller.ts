import Gateway from '#models/gateway'
import { updateGatewayPriorityValidator } from '#validators/gateway'
import type { HttpContext } from '@adonisjs/core/http'

export default class GatewaysController {
    async index() {
        const gateways = await Gateway.all()
        return gateways
    }

    async updatePriority({ request, params }: HttpContext) {
        const { priority } = await updateGatewayPriorityValidator.validate(request.all())
        const gateway = await Gateway.findOrFail(params.id)
        gateway.priority = priority
        await gateway.save()
        return gateway
    }

    async toggleActive({ params }: HttpContext) {
        const gateway = await Gateway.findOrFail(params.id)
        gateway.isActive = !gateway.isActive
        await gateway.save()
        return gateway
    }
}