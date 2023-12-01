/**
 * @name CommandNameMissingException
 * @description Thrown when a command is missing a commandName property.
 */
export default class CommandNameMissingException extends Error {
  constructor() {
    super(
      `Command name is missing, please provide a static commandName property when extending BaseCommand.`
    );
  }
}
