import { Unsubscribe } from '../types';
import { QueryBusContract, QueryContract } from './contracts';
import {
  QueryAlreadyRegisteredException,
  QueryNotFoundException,
} from './exceptions';
import { QueryHandler } from './types';

export class QueryBus implements QueryBusContract {
  private readonly handlers = new Map<string, QueryHandler>();

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
