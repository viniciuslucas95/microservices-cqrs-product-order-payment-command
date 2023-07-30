import { Pool } from 'pg';

import Logger from '../logger/Logger';
import IRegistry, { Registries } from './IRegistry';
import PayProductOrderCommandHandler from '../../application/product-order-payment/pay/PayProductOrderCommandHandler';
import ProductOrderPaymentRepository from '../repository/product-order-payment/ProductOrderPaymentRepository';
import ProductOrderPaymentUpdateExchangePublisher from '../queue/product-order-payment/ProductOrderPaymentUpdateExchangePublisher';
import ProductOrderPaymentService from '../payment/ProductOrderPaymentService';

export default class Registry implements IRegistry {
  private readonly _singletons: Registries;

  constructor(
    databaseHost = 'postgres-product-order-payment-command',
    databasePort = 5432,
    databaseUsername = 'admin',
    databasePassword = 'admin',
    databaseName = 'dev',
    messageBrokerHost?: string,
    messageBrokerPort?: number,
    messageBrokerUsername?: string,
    messageBrokerPassword?: string,
  ) {
    this._singletons = {
      logger: new Logger(),
      payProductOrderCommandHandler: new PayProductOrderCommandHandler(this),
      productOrderPaymentRepository: new ProductOrderPaymentRepository(
        new Pool({
          host: databaseHost,
          port: databasePort,
          user: databaseUsername,
          password: databasePassword,
          database: databaseName,
        }),
      ),
      productOrderPaymentUpdateExchangePublisher:
        new ProductOrderPaymentUpdateExchangePublisher(
          messageBrokerHost,
          messageBrokerPort,
          messageBrokerUsername,
          messageBrokerPassword,
        ),
      productOrderPaymentService: new ProductOrderPaymentService(),
    };
  }

  get<K extends keyof typeof this._singletons>(registry: K) {
    return this._singletons[registry] as (typeof this._singletons)[K];
  }
}
