export default interface IExchangeConsumer {
  name: string;
  queueName: string;

  startConsuming(): Promise<void>;
}
