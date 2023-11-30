/**
 * @name CommandAlreadyRegisteredException
 * @description Thrown when a command handler is already registered for a command.
 */
export class CommandAlreadyRegisteredException extends Error {
  constructor(commandName: string) {
    super(`Command handler for ${commandName} already registered`);
  }
}
