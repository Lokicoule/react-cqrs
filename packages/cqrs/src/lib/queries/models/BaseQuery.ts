import { QueryContract } from '../contracts';
import { QueryNameMissingException } from '../exceptions';

/**
 * @name BaseQuery
 * @description This base class helps to enforce the query name to be a static property.
 * @property queryName - The identifier of the query used to register the query handler.
 */
export default abstract class BaseQuery implements QueryContract {
  /**
   * @name queryName
   * @description The identifier of the query used to register the query handler.
   * When extending this class, you must override this property with a static value.
   * @static
   * @readonly
   * @example public static override readonly queryName = 'test-query';
   */
  public static readonly queryName: string;

  public get queryName(): string {
    this.ensure();

    return (this.constructor as typeof BaseQuery).queryName;
  }

  /**
   * @name ensure
   * @description Ensures that the query name is defined.
   * @throws QueryNameMissingException
   */
  private ensure(): void {
    if (!(this.constructor as typeof BaseQuery).queryName) {
      throw new QueryNameMissingException();
    }
  }
}
