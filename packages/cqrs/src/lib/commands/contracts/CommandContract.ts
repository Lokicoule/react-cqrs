/**
 * @name CommandContract
 * @property commandName - The identifier of the command used to register the command handler.
 */
export default interface CommandContract {
  readonly commandName: string;
}

/**
 * @name isCommandContract
 * @description Type guard for the `CommandContract` interface.
 */
export function isCommandContract(value: unknown): value is CommandContract {
  return !!(value as CommandContract).commandName;
}
