import ExchangePublisherBase from '../shared/ExchangePublisherBase';
import ProductOrderPaymentUpdateEvent from '../../../application/product-order-payment/pay/ProductOrderPaymentUpdateEvent';
import IProductOrderPaymentUpdateExchangePublisher from '../../../application/product-order-payment/pay/IProductOrderPaymentUpdateExchangePublisher';

export default class ProductOrderPaymentUpdateExchangePublisher
  extends ExchangePublisherBase<ProductOrderPaymentUpdateEvent>
  implements IProductOrderPaymentUpdateExchangePublisher
{
  constructor(
    host?: string,
    port?: number,
    username?: string,
    password?: string,
  ) {
    super('ProductOrderPayment', 'fanout', host, port, username, password);
  }
}
