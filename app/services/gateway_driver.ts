export interface GatewayDriverContract {
    authenticate(): Promise<string>
    createTransaction(payload: GatewayTransactionPayload, gatewayId: string): Promise<GatewayTransactionResult>
    refund(transactionId: string): Promise<GatewayRefundResult>
}

export type GatewayTransactionPayload = {
    clientId: string
    amount: number
    name: string
    email: string
    cardNumber: string
    cvv: string
}

export type GatewayTransactionResult = {
    success: boolean
    message: string
    externalId: string
    transactionStatus: string
    cardLastNumbers: string
}

export type GatewayRefundResult = {
    success: boolean
    message: string
    transactionId: string
    refundStatus: string
}