import IExchangePublisher from '../../../infra/queue/shared/IExchangePublisher';
import ProductOrderPaymentUpdateEvent from './ProductOrderPaymentUpdateEvent';

export default interface IProductOrderPaymentUpdatePublisher
  extends IExchangePublisher<ProductOrderPaymentUpdateEvent> {}
