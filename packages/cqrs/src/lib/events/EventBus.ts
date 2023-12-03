import { ObservableBus } from '../observables';
import { ObservableBusOptions } from '../observables/ObservableBus';
import { Callback } from '../types';
import {
  EventContract,
  EventHandlerEntity,
  EventRegistryContract,
  isEventHandlerContract,
  isEventHandlerFn,
} from './contracts';
import UnsupportedEventHandlerException from './exceptions/UnsupportedEventHandlerException';
import { EventRegistry } from './services';

export default class EventBus extends ObservableBus<EventContract> {
  constructor(
    options?: ObservableBusOptions,
    private readonly registry: EventRegistryContract<
      EventContract,
      EventHandlerEntity
    > = new EventRegistry()
  ) {
    super(options);
  }

  public register<TEvent extends EventContract>(
    event: TEvent,
    handler: EventHandlerEntity
  ): Callback {
    return this.registry.register(event, { handler });
  }

  public override execute<TEvent extends EventContract>(
    event: TEvent
  ): void | Promise<void> {
    const handlers = this.registry.resolve(event);

    for (const handler of handlers) {
      if (isEventHandlerContract<TEvent>(handler)) {
        handler.handle(event);
      } else if (isEventHandlerFn<TEvent>(handler)) {
        handler(event);
      } else {
        throw new UnsupportedEventHandlerException(event.eventName);
      }
    }
  }
}
