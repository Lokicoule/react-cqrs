import { Either } from '../../types';
import { CommandContract, CommandHandlerContract } from '../contracts';

/**
 * @name CommandHandlerFn
 * @description Allows for a command handler to be registered as a function.
 * @param command - The command to execute.
 * @returns The result of the command handler.
 */
export type CommandHandlerFn<
  TCommand extends CommandContract = CommandContract,
  TResult = unknown
> = (command: TCommand) => TResult;

/**
 * @name CommandHandler
 * @description A command handler can be registered as a function or as an object that implements the `CommandHandlerContract`.
 * @param command - The command to execute.
 * @returns The result of the command handler.
 */
export type CommandHandler<
  TCommand extends CommandContract = CommandContract,
  TResult = unknown
> = Either<
  CommandHandlerContract<TCommand, TResult>,
  CommandHandlerFn<TCommand, TResult>
>;
