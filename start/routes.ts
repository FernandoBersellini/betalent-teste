/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'

const AuthController = () => import('#controllers/auth_controller')

router.group(() => {
    router.post('/auth/login', [AuthController, 'login'])
    router.post('/auth/logout', [AuthController, 'logout']).use(middleware.auth({ guards: ['api'] }))
})
.prefix('api/v1')

router.group(() => {
    router.group(() => {
        router.get('/', [controllers.Gateways, 'index'])
        router.patch('/:id/priority', [controllers.Gateways, 'updatePriority'])
        router.patch('/:id/toggle', [controllers.Gateways, 'toggleActive'])
    })
    .prefix('gateways')
    .use(middleware.role({ roles: ['admin'] }))

    router.group(() => {
        router.get('/', [controllers.Products, 'index'])
        router.get('/:id', [controllers.Products, 'show'])
        router.post('/', [controllers.Products, 'store'])
        router.patch('/:id', [controllers.Products, 'update'])
        router.delete('/:id', [controllers.Products, 'destroy'])
    })
    .prefix('products')
    .use(middleware.role({ roles: ['admin', 'manager', 'finance'] }))

    router.group(() => {
        router.get('/', [controllers.Users, 'index'])
        router.get('/:id', [controllers.Users, 'show'])
        router.post('/', [controllers.Users, 'store'])
        router.patch('/:id', [controllers.Users, 'update'])
        router.delete('/:id', [controllers.Users, 'destroy'])
    })
    .prefix('users')
    .use(middleware.role({ roles: ['admin', 'manager'] }))

    router.group(() => {
        router.get('/', [controllers.Clients, 'index'])
        router.get('/:id', [controllers.Clients, 'show'])
    })
    .prefix('clients')
    .use(middleware.role({ roles: ['admin', 'user'] }))

    router.group(() => {
        router.get('/', [controllers.Transactions, 'index'])
        router.get('/:id', [controllers.Transactions, 'show'])
    })
    .prefix('transactions')
    .use(middleware.role({ roles: ['admin', 'user'] }))

    router.group(() => {
        router.post('/:id/refund', [controllers.Transactions, 'refund'])
    })
    .prefix('transactions')
    .use(middleware.role({ roles: ['admin', 'finance'] }))

    router.group(() => {
        router.post('/', [controllers.Purchases, 'store'])
    })
    .prefix('purchases')
    .use(middleware.role({ roles: ['admin', 'user'] }))
})
.prefix('api/v1')
.use(middleware.auth({ guards: ['api'] }))
