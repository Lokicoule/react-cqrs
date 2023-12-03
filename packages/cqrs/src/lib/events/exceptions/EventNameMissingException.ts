/**
 * @name EventNameMissingException
 * @description Thrown when a event is missing a eventName property.
 */
export default class EventNameMissingException extends Error {
  constructor() {
    super(
      `Event name is missing, please provide a static eventName property when extending BaseEvent.`
    );
  }
}
