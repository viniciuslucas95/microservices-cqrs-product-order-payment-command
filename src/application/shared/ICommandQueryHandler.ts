import CommandQueryBase from './CommandQueryBase';

export default interface ICommandQueryHandler<
  T extends CommandQueryBase,
  R extends object | void = void,
> {
  handle(data: T): Promise<R>;
}
