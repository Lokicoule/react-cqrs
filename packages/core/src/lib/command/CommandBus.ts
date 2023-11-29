import { Unsubscribe } from '../types';
import {
  CommandBusContract,
  CommandContract,
  CommandHandlerContract,
} from './contracts';
import {
  CommandAlreadyRegisteredException,
  CommandNotFoundException,
} from './exceptions';

export class CommandBus implements CommandBusContract {
  private readonly handlers = new Map<
    string,
    CommandHandlerContract<CommandContract>
  >();

  public register<TCommand extends CommandContract, TResult>(
    command: TCommand,
    handler: CommandHandlerContract<TCommand, TResult>
  ): Unsubscribe {
    if (this.handlers.has(command.commandName)) {
      throw new CommandAlreadyRegisteredException(command.commandName);
    }

    this.handlers.set(command.commandName, handler);

    return () => this.handlers.delete(command.commandName);
  }

  public execute<TCommand extends CommandContract, TResult = void>(
    command: TCommand
  ): TResult {
    const handler = this.handlers.get(command.commandName);

    if (!handler) {
      throw new CommandNotFoundException(command.commandName);
    }

    return handler.execute<TResult>(command) as TResult;
  }
}
