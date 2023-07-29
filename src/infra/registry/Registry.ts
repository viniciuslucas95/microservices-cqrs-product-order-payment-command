import { Pool } from 'pg';

import Logger from '../logger/Logger';
import IRegistry, { Registries } from './IRegistry';
import PayProductOrderCommandHandler from '../../application/product-order-payment/pay/PayProductOrderCommandHandler';
import ProductOrderPaymentRepository from '../repository/product-order-payment/ProductOrderPaymentRepository';

export default class Registry implements IRegistry {
  private readonly _singletons: Registries;

  constructor(
    databaseHost = 'localhost',
    databasePort = 5434,
    databaseUsername = 'admin',
    databasePassword = 'admin',
    databaseName = 'dev',
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
    };
  }

  get<K extends keyof typeof this._singletons>(registry: K) {
    return this._singletons[registry] as (typeof this._singletons)[K];
  }
}
