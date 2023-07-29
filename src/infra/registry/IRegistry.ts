import ILogger from '../logger/ILogger';
import IPayProductOrderCommandHandler from '../../application/product-order-payment/pay/IPayProductOrderCommandHandler';
import IProductOrderPaymentRepository from '../../application/product-order-payment/IProductOrderPaymentRepository';

export type Registries = {
  logger: ILogger;
  payProductOrderCommandHandler: IPayProductOrderCommandHandler;
  productOrderPaymentRepository: IProductOrderPaymentRepository;
};

export default interface IRegistry {
  get<K extends keyof Registries>(registry: K): Registries[K];
}
