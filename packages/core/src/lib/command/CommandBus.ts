import { Unsubscribe } from '../types';
import { CommandBusContract, CommandContract } from './contracts';
import {
  CommandAlreadyRegisteredException,
  CommandNotFoundException,
} from './exceptions';
import { CommandHandler } from './types';

export class CommandBus implements CommandBusContract {
  private readonly handlers = new Map<string, CommandHandler>();

  public register<TCommand extends CommandContract>(
    command: TCommand,
    handler: CommandHandler<TCommand>
  ): Unsubscribe {
    if (this.handlers.has(command.commandName)) {
      throw new CommandAlreadyRegisteredException(command.commandName);
    }

    this.handlers.set(command.commandName, handler as CommandHandler);

    return () => this.handlers.delete(command.commandName);
  }

  public execute<TCommand extends CommandContract, TResult = void>(
    command: TCommand
  ): TResult {
    const handler = this.handlers.get(command.commandName);

    if (!handler) {
      throw new CommandNotFoundException(command.commandName);
    }

    if (typeof handler === 'function') {
      return handler(command) as TResult;
    }

    return handler.execute(command) as TResult;
  }
}
