export default class ProductOrderPaymentUpdateEvent {
  constructor(
    readonly orderId: string,
    readonly status: string,
  ) {}
}
