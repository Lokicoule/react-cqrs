import {
  CommandBus,
  CommandContract,
  CommandHandler,
  isCommandContract,
  isCommandHandler,
} from '../commands';
import {
  QueryBus,
  QueryContract,
  QueryHandler,
  isQueryContract,
  isQueryHandler,
} from '../queries';
import { Callback } from '../types';
import { MediatorContract } from './contracts';
import UnsupportedHandlerException from './exceptions/UnsupportedHandlerException';
import UnsupportedMessageException from './exceptions/UnsupportedMessageException';

export default class Mediator implements MediatorContract {
  private subscriptionMap: Map<string, Callback> = new Map();

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  public subscribeToCommand<TContract extends CommandContract>(
    contract: TContract,
    handler: CommandHandler<TContract>
  ): void {
    if (isCommandContract(contract) && isCommandHandler(handler)) {
      const cb = this.commandBus.register(contract, handler);
      this.subscriptionMap.set(contract.commandName, cb);
    } else {
      throw new UnsupportedHandlerException(contract, handler);
    }
  }

  public subscribeToQuery<TContract extends QueryContract>(
    contract: TContract,
    handler: QueryHandler<TContract>
  ): void {
    if (isQueryContract(contract) && isQueryHandler(handler)) {
      const cb = this.queryBus.register(contract, handler);
      this.subscriptionMap.set(contract.queryName, cb);
    } else {
      throw new UnsupportedHandlerException(contract, handler);
    }
  }

  public publish<TMessage extends CommandContract | QueryContract, TResult>(
    message: TMessage
  ): TResult | void {
    if (isCommandContract(message)) {
      return this.commandBus.publish<TResult>(message);
    }

    if (isQueryContract(message)) {
      return this.queryBus.publish<TResult>(message);
    }

    throw new UnsupportedMessageException(message);
  }

  public unsubscribe<TMessage extends CommandContract | QueryContract>(
    message: TMessage
  ): void {
    const identifier = isCommandContract(message)
      ? message.commandName
      : message.queryName;

    const cb = this.subscriptionMap.get(identifier);

    if (cb) {
      cb();
      this.subscriptionMap.delete(identifier);
    }
  }
}
