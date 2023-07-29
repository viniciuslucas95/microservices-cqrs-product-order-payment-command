import EntityBase from './EntityBase';

export default class ProductOrderPaymentEntity extends EntityBase {
  public get status() {
    return this._status;
  }

  constructor(
    public readonly orderId: string,
    private _status = 'requested',
    id?: string,
  ) {
    super(id);
  }

  setStatus(status: 'approved' | 'refused') {
    this._status = status;
  }

  static create(orderId: string) {
    return new ProductOrderPaymentEntity(orderId);
  }
}
