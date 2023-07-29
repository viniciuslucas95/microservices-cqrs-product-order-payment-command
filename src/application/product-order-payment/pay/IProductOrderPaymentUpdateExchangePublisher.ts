import IExchangePublisher from '../../../infra/queue/shared/IExchangePublisher';
import ProductOrderPaymentUpdateEvent from './ProductOrderPaymentUpdateEvent';

export default interface IProductOrderPaymentUpdateExchangePublisher
  extends IExchangePublisher<ProductOrderPaymentUpdateEvent> {}
