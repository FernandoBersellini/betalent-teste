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


