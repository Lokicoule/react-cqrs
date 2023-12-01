import { CommandContract } from '../contracts';
import { CommandNameMissingException } from '../exceptions';

/**
 * @name BaseCommand
 * @description This base class helps to enforce the command name to be a static property.
 * @property commandName - The identifier of the command used to register the command handler.
 */
export default abstract class BaseCommand implements CommandContract {
  /**
   * @name commandName
   * @description The identifier of the command used to register the command handler.
   * When extending this class, you must override this property with a static value.
   * @static
   * @readonly
   * @example public static override readonly commandName = 'test-command';
   */
  public static readonly commandName: string;

  public get commandName(): string {
    this.ensure();

    return (this.constructor as typeof BaseCommand).commandName;
  }

  /**
   * @name ensure
   * @description Ensures that the command name is defined.
   * @throws CommandNameMissingException
   */
  private ensure(): void {
    if (!(this.constructor as typeof BaseCommand).commandName) {
      throw new CommandNameMissingException();
    }
  }
}
