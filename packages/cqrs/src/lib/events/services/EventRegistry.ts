import { BaseRegistry } from '../../registry';
import { Callback } from '../../types';
import {
  EventContract,
  EventRegistryContract,
  EventRegistryEntry,
} from '../contracts';
import { EventNotFoundException } from '../exceptions';

export default class EventRegistry<
    TEvent extends EventContract = EventContract,
    TResult = unknown
  >
  extends BaseRegistry<string, Array<EventRegistryEntry<TResult>>>
  implements EventRegistryContract<TEvent, TResult>
{
  public register(event: TEvent, entry: EventRegistryEntry<TResult>): Callback {
    const eventName = event.eventName;

    if (!this.has(eventName)) {
      this.set(eventName, []);
    }

    const eventEntries = this.get(eventName) as EventRegistryEntry<TResult>[];
    eventEntries.push(entry);

    return () => this.unregister(event, entry);
  }

  public resolve(event: TEvent): Array<TResult> {
    const eventName = event.eventName;

    if (!this.has(eventName)) {
      throw new EventNotFoundException(eventName);
    }

    return (this.get(eventName) as EventRegistryEntry<TResult>[]).map(
      (entry) => entry.handler
    );
  }

  private unregister(event: TEvent, entry: EventRegistryEntry<TResult>): void {
    const eventName = event.eventName;

    if (this.has(eventName)) {
      const eventEntries = this.get(eventName) as EventRegistryEntry<TResult>[];
      const entryIndex = eventEntries.indexOf(entry);

      if (entryIndex !== -1) {
        eventEntries.splice(entryIndex, 1);

        if (eventEntries.length === 0) {
          this.delete(eventName);
        }
      }
    }
  }
}
