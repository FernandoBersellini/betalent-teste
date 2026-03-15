import env from '#start/env'
import type {
  GatewayDriverContract,
  GatewayTransactionPayload,
  GatewayTransactionResult,
  GatewayRefundResult,
} from './gateway_driver.ts'

export class Gateway2Driver implements GatewayDriverContract {
  private baseUrl: string = env.get('GATEWAY2_URL')

  async authenticate(): Promise<string> {
    return ''
  }

  async createTransaction(
    payload: GatewayTransactionPayload,
    _gatewayId: string
  ): Promise<GatewayTransactionResult> {
    const response = await fetch(`${this.baseUrl}/transacoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        valor: payload.amount,
        nome: payload.name,
        email: payload.email,
        numeroCartao: payload.cardNumber,
        cvv: payload.cvv,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Gateway 2 - createTransaction falhou: ${error}`)
    }

    const data = (await response.json()) as {
      id: string | number
      status: string
      numero_cartao: string
    }

    return {
      success: true,
      message: 'Transação criada com sucesso',
      externalId: String(data.id),
      transactionStatus: data.status,
      cardLastNumbers: (data.numero_cartao ?? payload.cardNumber).slice(-4),
    }
  }

  async refund(transactionId: string): Promise<GatewayRefundResult> {
    const response = await fetch(`${this.baseUrl}/transacoes/reembolso`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: transactionId }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Gateway 2 - refund falhou: ${error}`)
    }

    const data = (await response.json()) as { id?: string | number; status?: string }

    return {
      success: true,
      message: 'Reembolso processado com sucesso',
      transactionId: String(data.id ?? transactionId),
      refundStatus: data.status ?? 'refunded',
    }
  }
}
