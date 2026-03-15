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

router.get('/', () => {
  return { hello: 'world' }
})

router.post('/api/v1/purchases', [controllers.Purchases, 'store'])

router.get('/api/v1/gateways', [controllers.Gateways, 'index'])
router.patch('/api/v1/gateways/:id/priority', [controllers.Gateways, 'updatePriority'])
router.patch('/api/v1/gateways/:id/toggle', [controllers.Gateways, 'toggleActive'])

router.get('/api/v1/products', [controllers.Products, 'index'])
router.get('/api/v1/products/:id', [controllers.Products, 'show'])
router.post('/api/v1/products', [controllers.Products, 'store'])
router.patch('/api/v1/products/:id', [controllers.Products, 'update'])
router.delete('/api/v1/products/:id', [controllers.Products, 'destroy'])

router.get('/api/v1/users', [controllers.Users, 'index'])
router.get('/api/v1/users/:id', [controllers.Users, 'show'])
router.post('/api/v1/users', [controllers.Users, 'store'])
router.patch('/api/v1/users/:id', [controllers.Users, 'update'])
router.delete('/api/v1/users/:id', [controllers.Users, 'destroy'])

router.get('/api/v1/clients', [controllers.Clients, 'index'])
router.get('/api/v1/clients/:id', [controllers.Clients, 'show'])

router.get('/api/v1/transactions', [controllers.Transactions, 'index'])
router.get('/api/v1/transactions/:id', [controllers.Transactions, 'show'])
router.post('/api/v1/transactions/:id/refund', [controllers.Transactions, 'refund'])