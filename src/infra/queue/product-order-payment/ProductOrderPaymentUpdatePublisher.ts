import ExchangePublisherBase from '../shared/ExchangePublisherBase';
import ProductOrderPaymentUpdateEvent from '../../../application/product-order-payment/pay/ProductOrderPaymentUpdateEvent';
import IProductOrderPaymentUpdatePublisher from '../../../application/product-order-payment/pay/IProductOrderPaymentUpdatePublisher';

export default class ProductOrderPaymentUpdatePublisher
  extends ExchangePublisherBase<ProductOrderPaymentUpdateEvent>
  implements IProductOrderPaymentUpdatePublisher
{
  constructor(
    host?: string,
    port?: number,
    username?: string,
    password?: string,
  ) {
    super(
      'ProductOrderPaymentUpdate',
      'fanout',
      host,
      port,
      username,
      password,
    );
  }
}
