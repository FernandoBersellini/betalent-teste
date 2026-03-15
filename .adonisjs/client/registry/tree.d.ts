/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  purchases: {
    store: typeof routes['purchases.store']
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
}
