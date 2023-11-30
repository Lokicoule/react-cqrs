import { QueryContract } from '../contracts';

/**
 * @name BaseQuery
 * @description This base class helps to enforce the query name to be a static property.
 * @property queryName - The identifier of the query used to register the query handler.
 */
export abstract class BaseQuery implements QueryContract {
  public static readonly queryName: string;

  public get queryName(): string {
    return (this.constructor as typeof BaseQuery).queryName;
  }
}
