import { CommandContract, CommandHandler } from '../../commands';
import { QueryContract, QueryHandler } from '../../queries';

export default interface MediatorContract {
  publish<TMessage extends CommandContract | QueryContract, TResult>(
    message: TMessage
  ): TResult | void;

  subscribeToCommand<TContract extends CommandContract>(
    contract: TContract,
    handler: CommandHandler<TContract>
  ): void;

  subscribeToQuery<TContract extends QueryContract>(
    contract: TContract,
    handler: QueryHandler<TContract>
  ): void;

  unsubscribe<TMessage extends CommandContract | QueryContract>(
    message: TMessage
  ): void;
}
