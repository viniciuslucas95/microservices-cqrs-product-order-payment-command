import ILogger from '../logger/ILogger';
import IPayProductOrderCommandHandler from '../../application/product-order-payment/pay/IPayProductOrderCommandHandler';
import IProductOrderPaymentRepository from '../../application/product-order-payment/IProductOrderPaymentRepository';
import IProductOrderPaymentUpdateExchangePublisher from '../../application/product-order-payment/pay/IProductOrderPaymentUpdateExchangePublisher';
import IProductOrderPaymentService from '../payment/IProductOrderPaymentService';

export type Registries = {
  logger: ILogger;
  payProductOrderCommandHandler: IPayProductOrderCommandHandler;
  productOrderPaymentRepository: IProductOrderPaymentRepository;
  productOrderPaymentUpdateExchangePublisher: IProductOrderPaymentUpdateExchangePublisher;
  productOrderPaymentService: IProductOrderPaymentService;
};

export default interface IRegistry {
  get<K extends keyof Registries>(registry: K): Registries[K];
}
