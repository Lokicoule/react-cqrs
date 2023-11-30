import { CommandContract } from '../contracts';

/**
 * @name BaseCommand
 * @description This base class helps to enforce the command name to be a static property.
 * @property commandName - The identifier of the command used to register the command handler.
 */
export abstract class BaseCommand implements CommandContract {
  public static readonly commandName: string;

  public get commandName(): string {
    return (this.constructor as typeof BaseCommand).commandName;
  }
}
