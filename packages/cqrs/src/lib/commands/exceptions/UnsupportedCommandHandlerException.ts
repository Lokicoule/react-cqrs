/**
 * @name UnsupportedCommandHandlerException
 * @description Thrown when a command handler does not implement the CommandHandlerContract or is not a function.
 */
export default class UnsupportedCommandHandlerException extends Error {
  constructor(commandName: string) {
    super(`Invalid command handler for ${commandName}`);
  }
}
