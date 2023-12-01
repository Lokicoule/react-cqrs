import { Unsubscribe } from '../types';
import CommandRegistry from './CommandRegistry';
import {
  CommandContract,
  CommandHandlerEntity,
  CommandRegistryContract,
  isCommandHandlerContract,
  isCommandHandlerFn,
} from './contracts';
import UnsupportedCommandHandlerException from './exceptions/UnsupportedCommandHandlerException';

export class CommandBus {
  private readonly registry: CommandRegistryContract<
    CommandContract,
    CommandHandlerEntity
  >;

  constructor() {
    this.registry = new CommandRegistry();
  }

  public register<TCommand extends CommandContract>(
    command: TCommand,
    handler: CommandHandlerEntity
  ): Unsubscribe {
    return this.registry.register(command, { handler });
  }

  public execute<TCommand extends CommandContract, TResult = void>(
    command: TCommand
  ): TResult {
    const handler = this.registry.resolve(command);

    if (isCommandHandlerContract<TCommand>(handler)) {
      return handler.execute(command);
    }

    if (isCommandHandlerFn<TCommand>(handler)) {
      return handler(command);
    }

    throw new UnsupportedCommandHandlerException(command.commandName);
  }
}
