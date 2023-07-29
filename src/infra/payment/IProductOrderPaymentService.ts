import ProductOrderPaymentEntity from '../../domain/entities/ProductOrderPaymentEntity';

export default interface IProductOrderPaymentService {
  handle(entity: ProductOrderPaymentEntity): Promise<void>;
}
