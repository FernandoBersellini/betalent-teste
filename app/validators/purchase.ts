import vine from '@vinejs/vine'

export const purchaseValidator = vine.create({
    productId: vine.string(),
    quantity: vine.number().positive(),
    name: vine.string(),
    email: vine.string().email(),
    cardNumber: vine.string().fixedLength(16),
    cvv: vine.string().minLength(3).maxLength(4),
})
