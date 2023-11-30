import {
  CommandBusContract,
  CommandContract,
  CommandHandlerContract,
} from '../command';
import {
  EventBusContract,
  EventContract,
  EventHandlerContract,
} from '../event';
import { EventResult } from '../event/types';
import {
  QueryBusContract,
  QueryContract,
  QueryHandlerContract,
} from '../query';
import { Unsubscribe } from '../shared/types';
import { MediatorContract } from './contracts';

export class Mediator implements MediatorContract {
  constructor(
    private readonly commandBus: CommandBusContract,
    private readonly eventBus: EventBusContract,
    private readonly queryBus: QueryBusContract
  ) {}

  public execute<TCommand extends CommandContract, TResult>(
    command: TCommand
  ): TResult {
    return this.commandBus.execute<TCommand, TResult>(command);
  }

  public dispatch<TEvent extends EventContract>(event: TEvent): EventResult {
    return this.eventBus.handle<TEvent>(event);
  }

  public query<TQuery extends QueryContract, TResult>(query: TQuery): TResult {
    return this.queryBus.execute<TQuery, TResult>(query);
  }

  public registerCommand<TCommand extends CommandContract>(
    command: TCommand,
    handler: CommandHandlerContract<TCommand>
  ): Unsubscribe {
    return this.commandBus.register<TCommand>(command, handler);
  }

  public registerEvent<TEvent extends EventContract>(
    event: TEvent,
    handler: EventHandlerContract<TEvent>
  ): Unsubscribe {
    return this.eventBus.register<TEvent>(event, handler);
  }

  public registerQuery<TQuery extends QueryContract>(
    query: TQuery,
    handler: QueryHandlerContract<TQuery>
  ): Unsubscribe {
    return this.queryBus.register<TQuery>(query, handler);
  }
}
