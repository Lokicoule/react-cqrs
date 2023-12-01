import {
  QueryAlreadyRegisteredException,
  QueryNotFoundException,
} from '../exceptions';
import { BaseRegistry } from '../../registry';
import { Callback } from '../../types';
import { QueryContract } from '../contracts';
import { QueryRegistryContract, QueryRegistryEntry } from '../contracts';

export default class QueryRegistry<
    TQuery extends QueryContract = QueryContract,
    TResult = unknown
  >
  extends BaseRegistry<string, QueryRegistryEntry<TResult>>
  implements QueryRegistryContract<TQuery, TResult>
{
  public register(query: TQuery, entry: QueryRegistryEntry<TResult>): Callback {
    if (this.has(query.queryName)) {
      throw new QueryAlreadyRegisteredException(query.queryName);
    }

    return this.set(query.queryName, entry);
  }

  public resolve(query: TQuery): TResult {
    const entry = this.get(query?.queryName);

    if (entry === undefined) {
      throw new QueryNotFoundException(query.queryName);
    }

    return entry.handler;
  }
}
