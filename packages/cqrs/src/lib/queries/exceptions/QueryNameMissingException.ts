/**
 * @name QueryNameMissingException
 * @description Thrown when a query is missing a queryName property.
 */
export default class QueryNameMissingException extends Error {
  constructor() {
    super(
      `Query name is missing, please provide a static queryName property when extending BaseQuery.`
    );
  }
}
