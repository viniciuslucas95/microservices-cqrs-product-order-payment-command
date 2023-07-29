import IPayProductOrderCommandHandler from './IPayProductOrderCommandHandler';
import PayProductOrderCommand from './PayProductOrderCommand';
import CommandQueryHandlerBase from '../../shared/CommandQueryHandlerBase';
import ProductOrderPaymentEntity from '../../../domain/entities/ProductOrderPaymentEntity';
import PayProductOrderDto from './PayProductOrderDto';
import ProductOrderPaymentUpdateEvent from './ProductOrderPaymentUpdateEvent';

export default class PayProductOrderCommandHandler
  extends CommandQueryHandlerBase
  implements IPayProductOrderCommandHandler
{
  async handle(data: PayProductOrderCommand): Promise<PayProductOrderDto> {
    const entity = ProductOrderPaymentEntity.create(data.orderId);

    // In a real scenario it wouldn't work like this, it's just for example purposes.
    const service = this.registry.get('productOrderPaymentService');
    await service.handle(entity);

    const repository = this.registry.get('productOrderPaymentRepository');
    await repository.createOrUpdate(entity);

    const event = new ProductOrderPaymentUpdateEvent(
      entity.orderId,
      entity.status,
    );
    const queue = this.registry.get(
      'productOrderPaymentUpdateExchangePublisher',
    );
    await queue.publish(event);

    return new PayProductOrderDto(entity.id);
  }
}
