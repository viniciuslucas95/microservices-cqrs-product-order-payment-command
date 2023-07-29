import ProductOrderPaymentEntity from '../../domain/entities/ProductOrderPaymentEntity';

export default interface IProductOrderPaymentRepository {
  createOrUpdate(entity: ProductOrderPaymentEntity): Promise<void>;
}
