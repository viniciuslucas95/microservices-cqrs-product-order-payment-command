import 'reflect-metadata';
import dotenv from 'dotenv';

import Registry from './infra/registry/Registry';
import ProductOrderedExchangeConsumer from './infra/queue/product-order/ProductOrderedExchangeConsumer';

dotenv.config();

process.env.TZ = 'UTC';

const databaseHostEnv = process.env.DATABASE_HOST;
const databasePortEnv = process.env.DATABASE_PORT;
const databaseUsernameEnv = process.env.DATABASE_USERNAME;
const databasePasswordEnv = process.env.DATABASE_PASSWORD;
const databaseNameEnv = process.env.DATABASE_NAME;
const messageBrokerHostEnv = process.env.MESSAGE_BROKER_HOST;
const messageBrokerPortEnv = process.env.MESSAGE_BROKER_PORT;
const messageBrokerUsernameEnv = process.env.MESSAGE_BROKER_USERNAME;
const messageBrokerPasswordEnv = process.env.MESSAGE_BROKER_PASSWORD;

let messageBrokerPort: number | undefined;
let databasePort: number | undefined;

if (messageBrokerPortEnv) {
  messageBrokerPort = parseInt(messageBrokerPortEnv);

  if (messageBrokerPort < 1)
    throw new Error('MESSAGE_BROKER_PORT cannot be lower than 1');
}

if (databasePortEnv) {
  databasePort = parseInt(databasePortEnv);

  if (databasePort < 1) throw new Error('DATABASE_PORT cannot be lower than 1');
}

const registry = new Registry(
  databaseHostEnv,
  databasePort,
  databaseUsernameEnv,
  databasePasswordEnv,
  databaseNameEnv,
);

new ProductOrderedExchangeConsumer(
  registry,
  messageBrokerHostEnv,
  messageBrokerPort,
  messageBrokerUsernameEnv,
  messageBrokerPasswordEnv,
).startConsuming();
