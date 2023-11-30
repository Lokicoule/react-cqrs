import { Unsubscribe } from '../../types';

export interface QueryContract {
  readonly queryName: string;
}

export interface QueryHandlerContract<
  TQuery extends QueryContract = QueryContract,
  TResult = unknown
> {
  execute(query: TQuery): TResult;
}

export interface QueryBusContract {
  register<TQuery extends QueryContract = QueryContract>(
    query: TQuery,
    handler: QueryHandlerContract<TQuery>
  ): Unsubscribe;

  execute<TQuery extends QueryContract, TResult = unknown>(
    query: TQuery
  ): TResult;
}
