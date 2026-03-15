import vine from '@vinejs/vine'

export const userValidator = vine.create({
  email: vine.string().email(),
  password: vine.string(),
  role: vine.enum(['admin', 'user','manager','finance']),
})

export const userUpdateValidator = vine.create({
  email: vine.string().email().optional(),
  password: vine.string().optional(),
  role: vine.enum(['admin', 'user','manager','finance']).optional(),
})