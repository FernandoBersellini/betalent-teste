import vine from '@vinejs/vine'

export const createProductValidator = vine.create({
    name: vine.string(),
    amount: vine.number(),
})

export const updateProductValidator = vine.create({
    name: vine.string(),
    amount: vine.number(),
})