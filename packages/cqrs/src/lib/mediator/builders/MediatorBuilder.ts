import { CommandBus } from '../commands';
import { QueryBus } from '../queries';
import Mediator from './Mediator';

export default class MediatorBuilder {
  private commandBus: CommandBus;
  private queryBus: QueryBus;

  constructor() {
    this.commandBus = new CommandBus();
    this.queryBus = new QueryBus();
  }

  public withCommandBus(commandBus: CommandBus): MediatorBuilder {
    this.commandBus = commandBus;
    return this;
  }

  public withQueryBus(queryBus: QueryBus): MediatorBuilder {
    this.queryBus = queryBus;
    return this;
  }

  public build(): Mediator {
    return new Mediator(this.commandBus, this.queryBus);
  }
}
