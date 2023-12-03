/**
 * @name EventContract
 * @property eventName - The identifier of the event used to register the event handler.
 */
export default interface EventContract {
  readonly eventName: string;
}

/**
 * @name isEventContract
 * @description Type guard for the `EventContract` interface.
 */
export function isEventContract(value: unknown): value is EventContract {
  return !!(value as EventContract).eventName;
}
