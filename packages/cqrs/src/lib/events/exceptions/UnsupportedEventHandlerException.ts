/**
 * @name UnsupportedEventHandlerException
 * @description Thrown when a event handler does not implement the EventHandlerContract or is not a function.
 */
export default class UnsupportedEventHandlerException extends Error {
  constructor(eventName: string) {
    super(`Invalid event handler for ${eventName}`);
  }
}
