import Gateway from '#models/gateway'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { randomUUID } from 'crypto'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.create({
      id: randomUUID(),
      email: 'admin@email.com',
      password: await hash.make('Admin_dev123'),
      role: 'admin',
    }),
    await Gateway.create({
      id: randomUUID(),
      name: 'Gateway 1',
      isActive: true, 
      priority: 1,
    }),
    await Gateway.create({
      id: randomUUID(),
      name: 'Gateway 2',
      isActive: true,
      priority: 2,
    })
  }
}