import { Unsubscribe } from '../../shared/types';

/**
 * @name CommandContract
 * @property commandName - The identifier of the command used to register the command handler.
 */
export interface CommandContract {
  readonly commandName: string;
}

/**
 * @name CommandHandlerContract
 * @method execute - Executes the command handler.
 */
export interface CommandHandlerContract<
  TCommand extends CommandContract = CommandContract,
  TResult = unknown
> {
  execute(command: TCommand): TResult;
}

/**
 * @name CommandBusContract
 * @method register - Registers a command handler for a command.
 * @method execute - Executes the command handler for a command.
 */
export interface CommandBusContract {
  register<TCommand extends CommandContract = CommandContract>(
    command: TCommand,
    handler: CommandHandlerContract<TCommand>
  ): Unsubscribe;

  execute<TCommand extends CommandContract, TResult = unknown>(
    command: TCommand
  ): TResult;
}
