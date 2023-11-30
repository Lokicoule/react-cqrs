import { Unsubscribe } from '../shared/types';
import { QueryBusContract, QueryContract } from './contracts';
import {
  QueryAlreadyRegisteredException,
  QueryNotFoundException,
} from './exceptions';
import { QueryHandler } from './types';

/**
 * @name QueryBus
 * @description The query bus allows for query handlers to be registered and executed.
 */
export class QueryBus implements QueryBusContract {
  private readonly handlers = new Map<string, QueryHandler>();

  /**
   * @name register
   * @description Registers a query handler for a query.
   * @param query - The query to register.
   * @param handler - The query handler to register.
   * @returns An unsubscribe function that can be used to unregister the query handler.
   */
  public register<TQuery extends QueryContract>(
    query: TQuery,
    handler: QueryHandler<TQuery>
  ): Unsubscribe {
    if (this.handlers.has(query.queryName)) {
      throw new QueryAlreadyRegisteredException(query.queryName);
    }

    this.handlers.set(query.queryName, handler as QueryHandler);

    return () => this.handlers.delete(query.queryName);
  }

  /**
   * @name execute
   * @description Executes the query handler for a query.
   * @param query - The query to execute.
   * @returns The result of the query handler.
   */
  public execute<TQuery extends QueryContract, TResult = void>(
    query: TQuery
  ): TResult {
    const handler = this.handlers.get(query.queryName);

    if (!handler) {
      throw new QueryNotFoundException(query.queryName);
    }

    if (typeof handler === 'function') {
      return handler(query) as TResult;
    }

    return handler.execute(query) as TResult;
  }
}
