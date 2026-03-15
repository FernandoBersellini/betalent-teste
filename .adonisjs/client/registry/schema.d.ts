/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'purchases.store': {
    methods: ["POST"]
    pattern: '/api/v1/purchases'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/purchase').purchaseValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/purchase').purchaseValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/purchases_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/purchases_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'gateways.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/gateways'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/gateways_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/gateways_controller').default['index']>>>
    }
  }
  'gateways.update_priority': {
    methods: ["PATCH"]
    pattern: '/api/v1/gateways/:id/priority'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/gateway').updateGatewayPriorityValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/gateway').updateGatewayPriorityValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/gateways_controller').default['updatePriority']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/gateways_controller').default['updatePriority']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'gateways.toggle_active': {
    methods: ["PATCH"]
    pattern: '/api/v1/gateways/:id/toggle'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/gateways_controller').default['toggleActive']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/gateways_controller').default['toggleActive']>>>
    }
  }
}
