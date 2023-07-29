import ProductOrderedEvent from '../../../application/product-order-payment/pay/ProductOrderedEvent';
import ExchangeConsumerBase from '../shared/ExchangeConsumerBase';
import IRegistry from '../../registry/IRegistry';
import CommandQueryBase from '../../../application/shared/CommandQueryBase';
import PayProductOrderCommand from '../../../application/product-order-payment/pay/PayProductOrderCommand';

export default class ProductOrderedExchangeConsumer extends ExchangeConsumerBase<ProductOrderedEvent> {
  constructor(
    private readonly registry: IRegistry,
    host?: string,
    port?: number,
    username?: string,
    password?: string,
  ) {
    super(
      'ProductOrdered',
      'Payment',
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
