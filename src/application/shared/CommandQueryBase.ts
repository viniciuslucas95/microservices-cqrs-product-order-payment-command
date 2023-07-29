import { validateSync } from 'class-validator';
import { ClassConstructor, plainToClass } from 'class-transformer';

export default abstract class CommandQueryBase {
  static create<T extends CommandQueryBase>(
    type: ClassConstructor<T>,
    data: object,
  ) {
    const result = plainToClass(type, data);

    const errors = validateSync(result);

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return result;
  }
}
