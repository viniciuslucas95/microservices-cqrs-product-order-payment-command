export default interface IQueueConsumer {
  name: string;
  queueName: string;

  startConsuming(): Promise<void>;
}
