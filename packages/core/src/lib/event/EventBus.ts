import { Unsubscribe } from '../shared/types';
import { EventBusContract, EventContract } from './contracts';
import { EventNotFoundException } from './exceptions';
import { EventHandler } from './types';

/**
 * @name EventBus
 * @description The event bus allows for event handlers to be registered and executed.
 */
export class EventBus implements EventBusContract {
  private readonly handlers = new Map<string, Array<EventHandler>>();

  /**
   * @name register
   * @description Registers a event handler for a event.
   * @param event - The event to register.
   * @param handler - The event handler to register.
   * @returns An unsubscribe function that can be used to unregister the event handler.
   */
  public register<TEvent extends EventContract>(
    event: TEvent,
    handler: EventHandler<TEvent>
  ): Unsubscribe {
    const handlers = this.handlers.get(event.eventName);

    if (handlers) {
      handlers.push(handler as EventHandler);
    } else {
      this.handlers.set(event.eventName, [handler as EventHandler]);
    }

    return () => this.unsubscribe(event, handler);
  }

  /**
   * @name handle
   * @description Executes the event handler for a event.
   * @param event - The event to handle.
   * @returns The result of the event handler.
   */
  public handle<TEvent extends EventContract>(event: TEvent) {
    const handler = this.handlers.get(event.eventName);

    if (!handler) {
      throw new EventNotFoundException(event.eventName);
    }

    handler.forEach((handler) => {
      if (typeof handler === 'function') {
        handler(event);
      } else {
        handler.handle(event);
      }
    });
  }

  private unsubscribe<TEvent extends EventContract>(
    event: TEvent,
    handler: EventHandler<TEvent>
  ) {
    const handlers = this.handlers.get(event.eventName);

    if (!handlers) {
      return;
    }

    const index = handlers.indexOf(handler as EventHandler);

    if (index !== -1) {
      handlers.splice(index, 1);
    }
  }
}
