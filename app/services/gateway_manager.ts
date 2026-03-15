import Gateway from '#models/gateway'
import logger from '@adonisjs/core/services/logger'
import { Gateway1Driver } from './gateway1_driver.ts'
import { Gateway2Driver } from './gateway2_driver.ts'
import { AllGatewaysFailedException } from '#exceptions/all_gateways_failed_exception'
import type {
  GatewayDriverContract,
  GatewayTransactionPayload,
  GatewayTransactionResult,
  GatewayRefundResult,
} from './gateway_driver.ts'

const GATEWAY_TIMEOUT_MS = 10_000

export class GatewayManager {
  private driverMap: Record<string, () => GatewayDriverContract> = {
    'Gateway 1': () => new Gateway1Driver(),
    'Gateway 2': () => new Gateway2Driver(),
  }

  private createDriver(gatewayName: string): GatewayDriverContract {
    const factory = this.driverMap[gatewayName]
    if (!factory) {
      throw new Error(`Driver não encontrado para gateway: ${gatewayName}`)
    }
    return factory()
  }

  async processPayment(
    payload: GatewayTransactionPayload
  ): Promise<{ result: GatewayTransactionResult; gatewayId: string }> {
    const gateways = await Gateway.query()
      .where('is_active', true)
      .orderBy('priority', 'asc')

    if (gateways.length === 0) {
      throw new AllGatewaysFailedException('Nenhum gateway ativo encontrado')
    }

    const errors: Array<{ gateway: string; error: string }> = []

    for (const gateway of gateways) {
      try {
        logger.info(`Tentando processar pagamento via ${gateway.name}`)
        const driver = this.createDriver(gateway.name!)

        const result = await withTimeout(                               
          driver.createTransaction(payload, gateway.id),
          GATEWAY_TIMEOUT_MS
        )

        if (result.success) {
          logger.info(`Pagamento processado com sucesso via ${gateway.name}`)
          return { result, gatewayId: gateway.id }
        }

        const msg = `${gateway.name} retornou falha: ${result.message}`
        logger.warn(msg)
        errors.push({ gateway: gateway.name!, error: msg })
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        logger.error(`Falha no ${gateway.name}: ${msg}`)
        errors.push({ gateway: gateway.name!, error: msg })
      }
    }

    throw new AllGatewaysFailedException(
      `Todos os gateways falharam: ${errors.map((e) => `[${e.gateway}] ${e.error}`).join('; ')}`
    )
  }

  async processRefund(
    externalId: string,
    gatewayId: string
  ): Promise<GatewayRefundResult> {
    const gateway = await Gateway.findOrFail(gatewayId)
    const driver = this.createDriver(gateway.name!)

    logger.info(`Processando reembolso via ${gateway.name} para transação ${externalId}`)

    const result = await withTimeout(
      driver.refund(externalId),
      GATEWAY_TIMEOUT_MS
    )

    if (!result.success) {
      throw new Error(`Reembolso falhou via ${gateway.name}: ${result.message}`)
    }

    logger.info(`Reembolso processado com sucesso via ${gateway.name}`)
    return result
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timeout: gateway não respondeu em ${ms}ms`))
    }, ms)

    promise
      .then((value) => {
        clearTimeout(timer)
        resolve(value)
      })
      .catch((err) => {
        clearTimeout(timer)
        reject(err)
      })
  })
}
