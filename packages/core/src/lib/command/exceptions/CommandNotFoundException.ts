/**
 * @name CommandNotFoundException
 * @description Thrown when a command handler is not registered for a command.
 */
export class CommandNotFoundException extends Error {
  constructor(commandName: string) {
    super(`Command handler for ${commandName} not found`);
  }
}
