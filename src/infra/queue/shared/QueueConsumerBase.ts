import amqp, { Channel } from 'amqplib';

import IQueueConsumer from './IQueueConsumer';

export default abstract class QueueConsumerBase<T extends object>
  implements IQueueConsumer
{
  protected constructor(
    public readonly name: string,
    public readonly queueName: string,
    private readonly type = 'fanout',
    private readonly host = 'localhost',
    private readonly port = 5672,
    private readonly username = 'guest',
    private readonly password = 'guest',
  ) {}

  public abstract startConsuming(): Promise<void>;

  protected async startConsumingFromQueue(exec: (data: T) => Promise<void>) {
    await this.withChannel((channel) => {
      channel.consume(this.queueName, async (message) => {
        if (!message) return;

        const stringifiedData = message.content.toString();

        const data = JSON.parse(stringifiedData) as T;

        await exec(data);

        channel.ack(message);
      });
    });
  }

  private async withChannel(exec: (channel: Channel) => void) {
    const url = `amqp://${this.username}:${this.password}@${this.host}:${this.port}`;
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();

    await channel.assertExchange(this.name, this.type, { durable: true });
    const queue = await channel.assertQueue(this.queueName, { durable: true });
    await channel.bindQueue(queue.queue, this.name, '');

    exec(channel);
  }
}
