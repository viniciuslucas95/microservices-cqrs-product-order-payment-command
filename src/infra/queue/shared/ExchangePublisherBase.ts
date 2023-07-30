import amqp, { ConfirmChannel } from 'amqplib';

import IExchangePublisher from './IExchangePublisher';

export default abstract class ExchangePublisherBase<T extends object>
  implements IExchangePublisher<T>
{
  protected constructor(
    public readonly name: string,
    private readonly type = 'fanout',
    private readonly host = 'rabbitmq',
    private readonly port = 5672,
    private readonly username = 'guest',
    private readonly password = 'guest',
  ) {}

  public async publish(data: T, queue = '') {
    const stringifiedData = JSON.stringify(data);
    const buffer = Buffer.from(stringifiedData, 'utf8');

    await this.withChannel(async (channel) => {
      await new Promise<void>((resolve, reject) => {
        channel.publish(
          this.name,
          queue,
          buffer,
          { mandatory: true, persistent: true },
          (err) => {
            if (err) {
              reject();
              return;
            }

            resolve();
          },
        );
      });
    });
  }

  private async withChannel(exec: (channel: ConfirmChannel) => Promise<void>) {
    const url = `amqp://${this.username}:${this.password}@${this.host}:${this.port}`;

    const connection = await amqp.connect(url);
    const channel = await connection.createConfirmChannel();

    await channel.assertExchange(this.name, this.type, {
      durable: true,
    });

    await exec(channel);

    await connection.close();
  }
}
