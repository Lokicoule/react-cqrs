import { ObservableBus } from '../observables';
import { ObservableBusOptions } from '../observables/ObservableBus';
import { Callback } from '../types';
import {
  CommandContract,
  CommandHandlerEntity,
  CommandRegistryContract,
  isCommandHandlerContract,
  isCommandHandlerFn,
} from './contracts';
import UnsupportedCommandHandlerException from './exceptions/UnsupportedCommandHandlerException';
import { CommandRegistry } from './services';

export default class CommandBus extends ObservableBus<CommandContract> {
  constructor(
    options?: ObservableBusOptions,
    private readonly registry: CommandRegistryContract<
      CommandContract,
      CommandHandlerEntity
    > = new CommandRegistry()
  ) {
    super(options);
  }

  public register<TCommand extends CommandContract>(
    command: TCommand,
    handler: CommandHandlerEntity
  ): Callback {
    return this.registry.register(command, { handler });
  }

  public execute<TCommand extends CommandContract, TResult = void>(
    command: TCommand
  ): TResult {
    const handler = this.registry.resolve(command);

    let result: TResult;
    if (isCommandHandlerContract<TCommand>(handler)) {
      result = handler.execute<TResult>(command);
    } else if (isCommandHandlerFn<TCommand>(handler)) {
      result = handler<TResult>(command);
    } else {
      throw new UnsupportedCommandHandlerException(command.commandName);
    }

    return result;
  }
}
