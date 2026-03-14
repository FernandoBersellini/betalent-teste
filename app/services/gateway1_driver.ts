import env from "#start/env";
import {
  GatewayDriverContract,
  GatewayTransactionPayload,
  GatewayTransactionResult,
  GatewayRefundResult,
} from "./gateway_driver.ts";

export class Gateway1Driver implements GatewayDriverContract {
  private baseUrl: string = env.get("GATEWAY1_URL");

  async authenticate(): Promise<string> {
    return "";
  }

  async createTransaction(
    payload: GatewayTransactionPayload
  ): Promise<GatewayTransactionResult> {
    const response = await fetch(`${this.baseUrl}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: payload.amount,
        name: payload.name,
        email: payload.email,
        cardNumber: payload.cardNumber,
        cvv: payload.cvv,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gateway 1 - createTransaction falhou: ${error}`);
    }

    const data = await response.json() as { id: string | number; status: string };

    return {
      sucess: true,
      message: "Transação criada com sucesso",
      transactionId: String(data.id),
      transactionStatus: data.status,
    };
  }

  async refund(transactionId: string): Promise<GatewayRefundResult> {
    const response = await fetch(
      `${this.baseUrl}/transactions/${transactionId}/charge_back`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gateway 1 - refund falhou: ${error}`);
    }

    const data = await response.json() as { id?: string | number; status?: string };

    return {
      sucess: true,
      message: "Reembolso processado com sucesso",
      transactionId: String(data.id ?? transactionId),
      refundStatus: data.status ?? "refunded",
    };
  }
}