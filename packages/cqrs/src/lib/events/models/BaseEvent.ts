import { EventContract } from '../contracts';
import { EventNameMissingException } from '../exceptions';

/**
 * @name BaseEvent
 * @description This base class helps to enforce the event name to be a static property.
 * @property eventName - The identifier of the event used to register the event handler.
 */
export default abstract class BaseEvent implements EventContract {
  /**
   * @name eventName
   * @description The identifier of the event used to register the event handler.
   * When extending this class, you must override this property with a static value.
   * @static
   * @readonly
   * @example public static override readonly eventName = 'test-event';
   */
  public static readonly eventName: string;

  public get eventName(): string {
    this.ensure();

    return (this.constructor as typeof BaseEvent).eventName;
  }

  /**
   * @name ensure
   * @description Ensures that the event name is defined.
   * @throws EventNameMissingException
   */
  private ensure(): void {
    if (!(this.constructor as typeof BaseEvent).eventName) {
      throw new EventNameMissingException();
    }
  }
}
