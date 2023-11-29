import { Unsubscribe } from '../../types';

export interface CommandContract {
  readonly commandName: string;
}

export interface CommandHandlerContract<
  TCommand extends CommandContract = CommandContract,
  TResult = unknown
> {
  execute(command: TCommand): TResult;
}

export interface CommandBusContract {
  register<TCommand extends CommandContract = CommandContract>(
    command: TCommand,
    handler: CommandHandlerContract<TCommand>
  ): Unsubscribe;

  execute<TCommand extends CommandContract, TResult = unknown>(
    command: TCommand
  ): TResult;
}
