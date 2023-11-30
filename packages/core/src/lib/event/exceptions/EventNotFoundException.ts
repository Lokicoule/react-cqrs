/**
 * @name EventNotFoundException
 * @description Thrown when a event handler is not registered for a event.
 */
export class EventNotFoundException extends Error {
  constructor(eventName: string) {
    super(`Event handler for ${eventName} not found`);
  }
}
