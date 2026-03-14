export interface GatewayDriverContract {
    authenticate(): Promise<string>
    createTransaction(payload: GatewayTransactionPayload): Promise<GatewayTransactionResult>
    refund(transactionId: string): Promise<GatewayRefundResult>
}

export type GatewayTransactionPayload = {
    amount: number
    name: string
    email: string
    cardNumber: string
    cvv: string
}

export type GatewayTransactionResult = {
    sucess: boolean
    message: string
    transactionId: string
    transactionStatus: string
}

export type GatewayRefundResult = {
    sucess: boolean
    message: string
    transactionId: string
    refundStatus: string
}