import vine from '@vinejs/vine'

export const updateGatewayPriorityValidator = vine.create({
    priority: vine.number().positive(),
})