import { v4 } from 'uuid';

export default abstract class EntityBase {
  protected constructor(public readonly id = v4()) {}
}
