import ProductOrderedEvent from '../../../application/product-order-payment/pay/ProductOrderedEvent';
import QueueConsumerBase from '../shared/QueueConsumerBase';
import IRegistry from '../../registry/IRegistry';
import CommandQueryBase from '../../../application/shared/CommandQueryBase';
import PayProductOrderCommand from '../../../application/product-order-payment/pay/PayProductOrderCommand';

export default class ProductOrderedQueueConsumer extends QueueConsumerBase<ProductOrderedEvent> {
  constructor(
    private readonly registry: IRegistry,
    host?: string,
    port?: number,
    username?: string,
    password?: string,
  ) {
    super(
      'ProductOrdered',
      'PaymentRequest',
      'fanout',
      host,
      port,
      username,
      password,
    );
  }

  async startConsuming() {
    const commandHandler = this.registry.get('payProductOrderCommandHandler');

    await this.startConsumingFromQueue(async (data) => {
      const command = CommandQueryBase.create(PayProductOrderCommand, data);

      await commandHandler.handle(command);
    });

    const logger = this.registry.get('logger');

    logger.log(
      `Started consuming from ${this.name}/${this.queueName} queue...`,
    );
  }
}
