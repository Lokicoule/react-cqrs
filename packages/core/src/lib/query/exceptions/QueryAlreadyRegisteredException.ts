/**
 * @name QueryAlreadyRegisteredException
 * @description Thrown when a query handler is already registered for a query.
 */
export class QueryAlreadyRegisteredException extends Error {
  constructor(queryName: string) {
    super(`Query handler for ${queryName} already registered`);
  }
}
