import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'purchases.store': { paramsTuple?: []; params?: {} }
    'gateways.index': { paramsTuple?: []; params?: {} }
    'gateways.update_priority': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateways.toggle_active': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'gateways.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'gateways.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'purchases.store': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'gateways.update_priority': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateways.toggle_active': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}