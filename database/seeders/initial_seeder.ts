import Gateway from '#models/gateway'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.create({
      email: 'admin@email.com',
      password: 'Admin_dev123',
      role: 'admin',
    }),
    await Gateway.create({
      name: 'Gateway 1',
      priority: 1,
    }),
    await Gateway.create({
      name: 'Gateway 2',
      priority: 2,
    })
  }
}