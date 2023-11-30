import { Unsubscribe } from '../../types';
import { EventResult } from '../types';

/**
 * @name EventContract
 * @property eventName - The identifier of the event used to register the event handler.
 */
export interface EventContract {
  readonly eventName: string;
}

/**
 * @name EventHandlerContract
 * @method execute - Executes the event handler.
 */
export interface EventHandlerContract<
  TEvent extends EventContract = EventContract
> {
  handle(event: TEvent): EventResult;
}

/**
 * @name EventBusContract
 * @method register - Registers a event handler for a event.
 * @method handle - Handles the event.
 */
export interface EventBusContract {
  register<TEvent extends EventContract = EventContract>(
    event: TEvent,
    handler: EventHandlerContract<TEvent>
  ): Unsubscribe;

  handle<TEvent extends EventContract>(event: TEvent): EventResult;
}
