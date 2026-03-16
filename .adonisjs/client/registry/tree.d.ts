/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
    logout: typeof routes['auth.logout']
  }
  gateways: {
    index: typeof routes['gateways.index']
    updatePriority: typeof routes['gateways.update_priority']
    toggleActive: typeof routes['gateways.toggle_active']
  }
  products: {
    index: typeof routes['products.index']
    show: typeof routes['products.show']
    store: typeof routes['products.store']
    update: typeof routes['products.update']
    destroy: typeof routes['products.destroy']
  }
  users: {
    index: typeof routes['users.index']
    show: typeof routes['users.show']
    store: typeof routes['users.store']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
  }
  clients: {
    index: typeof routes['clients.index']
    show: typeof routes['clients.show']
  }
  transactions: {
    index: typeof routes['transactions.index']
    show: typeof routes['transactions.show']
    refund: typeof routes['transactions.refund']
  }
  purchases: {
    store: typeof routes['purchases.store']
  }
}
