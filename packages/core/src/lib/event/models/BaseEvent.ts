import { EventContract } from '../contracts';

/**
 * @name BaseEvent
 * @description This base class helps to enforce the event name to be a static property.
 * @property eventName - The identifier of the event used to register the event handler.
 */
export abstract class BaseEvent implements EventContract {
  public static readonly eventName: string;

  public get eventName(): string {
    return (this.constructor as typeof BaseEvent).eventName;
  }
}
