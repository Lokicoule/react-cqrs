import { ObservableBus } from '../observables';
import { ObservableBusOptions } from '../observables/ObservableBus';
import { Callback } from '../types';
import {
  QueryContract,
  QueryHandler,
  QueryRegistryContract,
  isQueryHandlerContract,
  isQueryHandlerFn,
} from './contracts';
import UnsupportedQueryHandlerException from './exceptions/UnsupportedQueryHandlerException';
import { QueryRegistry } from './services';

export default class QueryBus extends ObservableBus<QueryContract> {
  constructor(
    options?: ObservableBusOptions,
    private readonly registry: QueryRegistryContract<
      QueryContract,
      QueryHandler
    > = new QueryRegistry()
  ) {
    super(options);
  }

  public register<TQuery extends QueryContract>(
    query: TQuery,
    handler: QueryHandler
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

    return result;
  }
}
