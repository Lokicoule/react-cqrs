import {
  CommandAlreadyRegisteredException,
  CommandNotFoundException,
} from '../exceptions';
import { BaseRegistry } from '../../registry';
import { Callback } from '../../types';
import { CommandContract } from '../contracts';
import { CommandRegistryContract, CommandRegistryEntry } from '../contracts';

export default class CommandRegistry<
    TCommand extends CommandContract = CommandContract,
    TResult = unknown
  >
  extends BaseRegistry<string, CommandRegistryEntry<TResult>>
  implements CommandRegistryContract<TCommand, TResult>
{
  public register(
    command: TCommand,
    entry: CommandRegistryEntry<TResult>
  ): Callback {
    if (this.has(command.commandName)) {
      throw new CommandAlreadyRegisteredException(command.commandName);
    }

    return this.set(command.commandName, entry);
  }

  public resolve(command: TCommand): TResult {
    const entry = this.get(command?.commandName);

    if (entry === undefined) {
      throw new CommandNotFoundException(command.commandName);
    }

    return entry.handler;
  }
}
