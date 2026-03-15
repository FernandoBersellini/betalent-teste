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
}
