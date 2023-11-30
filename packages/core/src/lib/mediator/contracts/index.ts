import { CommandContract, CommandHandlerContract } from '../../command';
import { EventContract, EventHandlerContract } from '../../event';
import { EventResult } from '../../event/types';
import { QueryContract, QueryHandlerContract } from '../../query';
import { Unsubscribe } from '../../shared/types';

export interface MediatorContract {
  execute<TCommand extends CommandContract, TResult>(
    command: TCommand
  ): TResult;
  dispatch<TEvent extends EventContract>(event: TEvent): EventResult;
  query<TQuery extends QueryContract, TResult>(query: TQuery): TResult;
  registerCommand<TCommand extends CommandContract>(
    command: TCommand,
    handler: CommandHandlerContract<TCommand>
  ): Unsubscribe;
  registerEvent<TEvent extends EventContract>(
    event: TEvent,
    handler: EventHandlerContract<TEvent>
  ): Unsubscribe;
  registerQuery<TQuery extends QueryContract>(
    query: TQuery,
    handler: QueryHandlerContract<TQuery>
  ): Unsubscribe;
}
