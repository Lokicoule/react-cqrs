import { ObservableBus } from '../observables';
import { Callback } from '../types';
import {
  QueryContract,
  QueryHandlerEntity,
  QueryRegistryContract,
  isQueryHandlerContract,
  isQueryHandlerFn,
} from './contracts';
import UnsupportedQueryHandlerException from './exceptions/UnsupportedQueryHandlerException';
import { QueryRegistry } from './services';

export default class QueryBus extends ObservableBus<QueryContract> {
  constructor(
    private readonly registry: QueryRegistryContract<
      QueryContract,
      QueryHandlerEntity
    > = new QueryRegistry()
  ) {
    super();
  }

  public register<TQuery extends QueryContract>(
    query: TQuery,
    handler: QueryHandlerEntity
  ): Callback {
    return this.registry.register(query, { handler });
  }

  public execute<TQuery extends QueryContract, TResult = void>(
    query: TQuery
  ): TResult {
    const handler = this.registry.resolve(query);

    let result: TResult;
    if (isQueryHandlerContract<TQuery>(handler)) {
      result = handler.execute<TResult>(query);
    } else if (isQueryHandlerFn<TQuery>(handler)) {
      result = handler<TResult>(query);
    } else {
      throw new UnsupportedQueryHandlerException(query.queryName);
    }

    this.publish(query);

    return result;
  }
}
