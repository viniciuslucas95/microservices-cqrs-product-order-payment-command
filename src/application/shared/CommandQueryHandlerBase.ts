import Registry from '../../infra/registry/Registry';

export default abstract class CommandQueryHandlerBase {
  constructor(protected readonly registry: Registry) {}
}
