import { RegistryContract } from '../../registry';
import { Callback } from '../../types';
import QueryContract from './QueryContract';

export type QueryRegistryEntry<T = unknown> = {
  handler: T;
};

export default interface QueryRegistryContract<
  TQuery extends QueryContract,
  TResult
> extends RegistryContract<string, QueryRegistryEntry<TResult>> {
  register(query: TQuery, entry: QueryRegistryEntry<TResult>): Callback;
  resolve(query: TQuery): TResult;
}
