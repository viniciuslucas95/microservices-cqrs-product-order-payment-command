import IProductOrderPaymentService from './IProductOrderPaymentService';
import ProductOrderPaymentEntity from '../../domain/entities/ProductOrderPaymentEntity';

export default class ProductOrderPaymentService
  implements IProductOrderPaymentService
{
  async handle(entity: ProductOrderPaymentEntity) {
    const resultOptions = ['approved', 'refused'] as const;
    const randomResultOptionIndex = Math.floor(Math.random() * 2);
    const status = resultOptions[randomResultOptionIndex];

    entity.setStatus(status);
  }
}
