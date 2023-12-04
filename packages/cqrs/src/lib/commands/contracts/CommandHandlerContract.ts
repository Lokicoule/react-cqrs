import CommandContract from './CommandContract';

export default interface CommandHandlerContract<
  TCommand extends CommandContract = CommandContract,
  TResult = unknown
> {
  execute(command: TCommand): TResult;
}

export interface CommandHandlerRuntime<
  TCommand extends CommandContract = CommandContract
> extends CommandHandlerContract<TCommand> {
  execute<TResult>(command: TCommand): TResult;
}

export type CommandHandlerFn<
  TCommand extends CommandContract = CommandContract
> = <TReturn>(command: TCommand) => TReturn;

export type CommandHandler<TCommand extends CommandContract = CommandContract> =
  CommandHandlerFn<TCommand> | CommandHandlerContract<TCommand>;

export function isCommandHandlerContract<
  TCommand extends CommandContract = CommandContract
>(handler: unknown): handler is CommandHandlerRuntime<TCommand> {
  return !!(handler as CommandHandlerContract<TCommand>).execute;
}

export function isCommandHandlerFn<
  TCommand extends CommandContract = CommandContract
>(handler: unknown): handler is CommandHandlerFn<TCommand> {
  return typeof handler === 'function';
}

export function isCommandHandler<
  TCommand extends CommandContract = CommandContract
>(handler: unknown): handler is CommandHandler<TCommand> {
  return (
    isCommandHandlerFn<TCommand>(handler) ||
    isCommandHandlerContract<TCommand>(handler)
  );
}
