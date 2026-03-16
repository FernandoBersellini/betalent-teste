import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)
    if (!user) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    const isValid = await hash.verify(user.password, password)
    if (!isValid) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    const token = await User.accessTokens.create(user)

    return {
      type: 'bearer',
      token: token.value!.release(),
    }
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    await User.accessTokens.delete(user, user.currentAccessToken!.identifier)

    return response.ok({ message: 'Logged out successfully' })
  }
}
