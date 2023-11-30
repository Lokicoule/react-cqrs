import { Unsubscribe } from '../../shared/types';

/**
 * @name QueryContract
 * @property queryName - The identifier of the query used to register the query handler.
 */
export interface QueryContract {
  readonly queryName: string;
}

/**
 * @name QueryHandlerContract
 * @method execute - Executes the query handler.
 */
export interface QueryHandlerContract<
  TQuery extends QueryContract = QueryContract,
  TResult = unknown
> {
  execute(query: TQuery): TResult;
}

/**
 * @name QueryBusContract
 * @method register - Registers a query handler for a query.
 * @method execute - Executes the query handler for a query.
 */
export interface QueryBusContract {
  register<TQuery extends QueryContract = QueryContract>(
    query: TQuery,
    handler: QueryHandlerContract<TQuery>
  ): Unsubscribe;

  execute<TQuery extends QueryContract, TResult = unknown>(
    query: TQuery
  ): TResult;
}
