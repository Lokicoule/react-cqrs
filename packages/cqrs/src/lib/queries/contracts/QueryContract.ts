/**
 * @name QueryContract
 * @property queryName - The identifier of the query used to register the query handler.
 */
export default interface QueryContract {
  readonly queryName: string;
}

/**
 * @name isQueryContract
 * @description Type guard for the `QueryContract` interface.
 */
export function isQueryContract(value: unknown): value is QueryContract {
  return !!(value as QueryContract).queryName;
}
