import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Role middleware is used to restrict access to routes
 * based on the authenticated user's role.
 */
export default class RoleMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      roles: string[]
    }
  ) {
    const user = ctx.auth.getUserOrFail()
    const userRole = (user as any).role

    if (!options.roles.includes(userRole)) {
      return ctx.response.forbidden({ message: 'Access denied: insufficient permissions' })
    }

    return next()
  }
}
