import { Either } from '../../types';
import { CommandContract, CommandHandlerContract } from '../contracts';

export type CommandHandlerFn<
  TCommand extends CommandContract = CommandContract,
  TResult = unknown
> = (command: TCommand) => TResult;

export type CommandHandler<
  TCommand extends CommandContract = CommandContract,
  TResult = unknown
> = Either<
  CommandHandlerContract<TCommand, TResult>,
  CommandHandlerFn<TCommand, TResult>
>;
