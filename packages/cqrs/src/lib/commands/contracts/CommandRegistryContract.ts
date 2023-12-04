import { RegistryContract } from '../../registry';
import { Callback } from '../../types';
import CommandContract from './CommandContract';

export type CommandRegistryEntry<T = unknown> = {
  handler: T;
};

export default interface CommandRegistryContract<
  TCommand extends CommandContract,
  TResult
> extends RegistryContract<string, CommandRegistryEntry<TResult>> {
  register(command: TCommand, entry: CommandRegistryEntry<TResult>): Callback;
  resolve(command: TCommand): TResult;
}
