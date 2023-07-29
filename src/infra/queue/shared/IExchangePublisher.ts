export default interface IExchangePublisher<T extends object> {
  name: string;

  publish(event: T, queue?: string): Promise<void>;
}
