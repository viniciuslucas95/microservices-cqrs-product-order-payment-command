import amqp, { Channel } from 'amqplib';

import IExchangePublisher from './IExchangePublisher';

export default abstract class ExchangePublisherBase<T extends object>
  implements IExchangePublisher<T>
{
  protected constructor(
    public readonly name: string,
    private readonly type = 'fanout',
    private readonly host = 'localhost',
    private readonly port = 5672,
    private readonly username = 'guest',
    private readonly password = 'guest',
  ) {}

  public async publish(data: T, queue = '') {
    const stringfiedData = JSON.stringify(data);
    const buffer = Buffer.from(stringfiedData, 'utf8');

    await this.withChannel((channel) => {
      channel.publish(this.name, queue, buffer);
    });
  }

  private async withChannel(exec: (channel: Channel) => void) {
    const url = `amqp://${this.username}:${this.password}@${this.host}:${this.port}`;
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();

    await channel.assertExchange(this.name, this.type, {
      durable: true,
    });

    exec(channel);

    await connection.close();
  }
}
