import { Unsubscribe } from '../../types';

export interface CommandContract {
  readonly commandName: string;
}

export interface CommandHandlerContract<
  TCommand extends CommandContract,
  TResult = unknown
> {
  execute<TReturn>(command: TCommand): TResult | TReturn;
}

export interface CommandBusContract {
  register<TCommand extends CommandContract>(
    command: TCommand,
    handler: CommandHandlerContract<TCommand>
  ): Unsubscribe;

  execute<TCommand extends CommandContract, TResult = unknown>(
    command: TCommand
  ): TResult;
}
