/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.group(() => {
    router.group(() => {
        router.get('/', [controllers.Gateways, 'index'])
        router.patch('/:id/priority', [controllers.Gateways, 'updatePriority'])
        router.patch('/:id/toggle', [controllers.Gateways, 'toggleActive'])
    })
    .prefix('gateways')

    router.group(() => {
        router.get('/', [controllers.Products, 'index'])
        router.get('/:id', [controllers.Products, 'show'])
        router.post('/', [controllers.Products, 'store'])
        router.patch('/:id', [controllers.Products, 'update'])
        router.delete('/:id', [controllers.Products, 'destroy'])
    })
    .prefix('products')

    router.group(() => {
        router.get('/', [controllers.Users, 'index'])
        router.get('/:id', [controllers.Users, 'show'])
        router.post('/', [controllers.Users, 'store'])
        router.patch('/:id', [controllers.Users, 'update'])
        router.delete('/:id', [controllers.Users, 'destroy'])
    })
    .prefix('users')

    router.group(() => {
        router.get('/', [controllers.Clients, 'index'])
        router.get('/:id', [controllers.Clients, 'show'])
    })
    .prefix('clients')

    router.group(() => {
        router.get('/', [controllers.Transactions, 'index'])
        router.get('/:id', [controllers.Transactions, 'show'])
        router.post('/:id/refund', [controllers.Transactions, 'refund'])
    })
    .prefix('transactions')

    router.group(() => {
        router.post('/', [controllers.Purchases, 'store'])
    })
    .prefix('purchases')
})
.prefix('api/v1')


