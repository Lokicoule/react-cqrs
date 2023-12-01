/**
 * @name QueryNotFoundException
 * @description Thrown when a query handler is not registered for a query.
 */
export default class QueryNotFoundException extends Error {
  constructor(queryName: string) {
    super(`Query handler for ${queryName} not found`);
  }
}
