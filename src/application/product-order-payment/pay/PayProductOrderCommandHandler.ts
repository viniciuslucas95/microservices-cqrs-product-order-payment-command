import IPayProductOrderCommandHandler from './IPayProductOrderCommandHandler';
import PayProductOrderCommand from './PayProductOrderCommand';
import CommandQueryHandlerBase from '../../shared/CommandQueryHandlerBase';
import ProductOrderPaymentEntity from '../../../domain/entities/ProductOrderPaymentEntity';
import PayProductOrderDto from './PayProductOrderDto';

export default class PayProductOrderCommandHandler
  extends CommandQueryHandlerBase
  implements IPayProductOrderCommandHandler
{
  async handle(data: PayProductOrderCommand): Promise<PayProductOrderDto> {
    const entity = ProductOrderPaymentEntity.create(data.orderId);

    const repository = this.registry.get('productOrderPaymentRepository');

    await repository.createOrUpdate(entity);

    // Emit an event

    return new PayProductOrderDto(entity.id);
  }
}
