import { Either } from '../../types';
import { QueryContract, QueryHandlerContract } from '../contracts';

/**
 * @name QueryHandlerFn
 * @description Allows for a query handler to be registered as a function.
 * @param command - The query to execute.
 * @returns The result of the query handler.
 */
export type QueryHandlerFn<
  TQuery extends QueryContract = QueryContract,
  TResult = unknown
> = (command: TQuery) => TResult;

/**
 * @name QueryHandler
 * @description A query handler can be registered as a function or as an object that implements the `QueryHandlerContract`.
 * @param command - The query to execute.
 * @returns The result of the query handler.
 */
export type QueryHandler<
  TQuery extends QueryContract = QueryContract,
  TResult = unknown
> = Either<
  QueryHandlerContract<TQuery, TResult>,
  QueryHandlerFn<TQuery, TResult>
>;
