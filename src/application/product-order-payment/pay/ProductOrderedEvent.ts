export default class ProductOrderedEvent {
  constructor(
    readonly orderId: string,
    readonly productId: string,
    readonly userId: string,
    readonly date: Date,
  ) {}
}
