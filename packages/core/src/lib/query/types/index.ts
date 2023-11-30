import { Either } from '../../types';
import { QueryContract, QueryHandlerContract } from '../contracts';

export type QueryHandlerFn<
  TQuery extends QueryContract = QueryContract,
  TResult = unknown
> = (command: TQuery) => TResult;

export type QueryHandler<
  TQuery extends QueryContract = QueryContract,
  TResult = unknown
> = Either<
  QueryHandlerContract<TQuery, TResult>,
  QueryHandlerFn<TQuery, TResult>
>;
