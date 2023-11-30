import { Unsubscribe } from '../shared/types';
import { CommandBusContract, CommandContract } from './contracts';
import {
  CommandAlreadyRegisteredException,
  CommandNotFoundException,
} from './exceptions';
import { CommandHandler } from './types';

/**
 * @name CommandBus
 * @description The command bus is responsible for registering and executing commands.
 */
export class CommandBus implements CommandBusContract {
  private readonly handlers = new Map<string, CommandHandler>();

  /**
   * @name register
   * @description Registers a command handler for a command.
   * @param command - The command to register.
   * @param handler - The command handler to register.
   * @returns An unsubscribe function that can be used to unregister the command handler.
   */
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

  /**
   * @name execute
   * @description Executes the command handler for a command.
   * @param command - The command to execute.
   * @returns The result of the command handler.
   */
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
