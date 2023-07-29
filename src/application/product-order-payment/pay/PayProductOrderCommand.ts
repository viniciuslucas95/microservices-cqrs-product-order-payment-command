import { IsString, IsUUID } from 'class-validator';

import CommandQueryBase from '../../shared/CommandQueryBase';

export default class PayProductOrderCommand extends CommandQueryBase {
  @IsString()
  @IsUUID()
  orderId!: string;
}
