import type { HttpContext } from '@adonisjs/core/http'

import User from "#models/user";
import { userUpdateValidator, userValidator } from '#validators/user';

export default class UsersController {
    async index() {
        return User.all()
    }
        
    async show({ params }: HttpContext) {
        return User.findOrFail(params.id)
    }

    async store({ request }: HttpContext) {
        const { email, password, role } = await userValidator.validate(request.all())
        const user = await User.create({ email, password, role })
        return user
    }

    async update({ params, request }: HttpContext) {
        const { email, password, role } = await userUpdateValidator.validate(request.all())
        const user = await User.findOrFail(params.id)
        user.email = email || user.email
        user.password = password || user.password
        user.role = role || user.role
        await user.save()
        return user
    }

    async destroy({ params }: HttpContext) {
        const user = await User.findOrFail(params.id)
        await user.delete()
        return user
    }
}