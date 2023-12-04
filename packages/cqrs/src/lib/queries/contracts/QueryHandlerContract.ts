import QueryContract from './QueryContract';

export default interface QueryHandlerContract<
  TQuery extends QueryContract = QueryContract,
  TResult = unknown
> {
  execute(query: TQuery): TResult;
}

export interface QueryHandlerRuntime<
  TQuery extends QueryContract = QueryContract
> extends QueryHandlerContract<TQuery> {
  execute<TResult>(query: TQuery): TResult;
}

export type QueryHandlerFn<TQuery extends QueryContract = QueryContract> = <
  TReturn
>(
  query: TQuery
) => TReturn;

export type QueryHandler<TQuery extends QueryContract = QueryContract> =
  | QueryHandlerFn<TQuery>
  | QueryHandlerContract<TQuery>;

export function isQueryHandlerContract<
  TQuery extends QueryContract = QueryContract
>(handler: unknown): handler is QueryHandlerRuntime<TQuery> {
  return !!(handler as QueryHandlerContract<TQuery>).execute;
}

export function isQueryHandlerFn<TQuery extends QueryContract = QueryContract>(
  handler: unknown
): handler is QueryHandlerFn<TQuery> {
  return typeof handler === 'function';
}

export function isQueryHandler<TQuery extends QueryContract = QueryContract>(
  handler: unknown
): handler is QueryHandler<TQuery> {
  return (
    isQueryHandlerFn<TQuery>(handler) || isQueryHandlerContract<TQuery>(handler)
  );
}
