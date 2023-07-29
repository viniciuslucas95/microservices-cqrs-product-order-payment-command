import ICommandQueryHandler from '../../shared/ICommandQueryHandler';
import PayProductOrderCommand from './PayProductOrderCommand';
import PayProductOrderDto from './PayProductOrderDto';

export default interface IPayProductOrderCommandHandler
  extends ICommandQueryHandler<PayProductOrderCommand, PayProductOrderDto> {}
