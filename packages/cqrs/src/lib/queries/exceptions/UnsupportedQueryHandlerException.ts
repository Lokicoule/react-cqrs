/**
 * @name UnsupportedQueryHandlerException
 * @description Thrown when a query handler does not implement the QueryHandlerContract or is not a function.
 */
export default class UnsupportedQueryHandlerException extends Error {
  constructor(queryName: string) {
    super(`Invalid query handler for ${queryName}`);
  }
}
