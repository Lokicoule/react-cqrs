import EventContract from './EventContract';

export default interface EventHandlerContract<
  TEvent extends EventContract = EventContract,
  TResult = unknown
> {
  handle(event: TEvent): void | Promise<TResult>;
}

export interface EventHandlerRuntime<
  TEvent extends EventContract = EventContract
> extends EventHandlerContract<TEvent> {
  handle<TResult>(event: TEvent): TResult;
}

export type EventHandlerFn<TEvent extends EventContract = EventContract> = <
  TReturn
>(
  event: TEvent
) => TReturn;

export type EventHandlerEntity<TEvent extends EventContract = EventContract> =
  | EventHandlerFn<TEvent>
  | EventHandlerContract<TEvent>;

export function isEventHandlerContract<
  TEvent extends EventContract = EventContract
>(handler: EventHandlerEntity<TEvent>): handler is EventHandlerRuntime<TEvent> {
  return !!(handler as EventHandlerContract<TEvent>).handle;
}

export function isEventHandlerFn<TEvent extends EventContract = EventContract>(
  handler: EventHandlerEntity<TEvent>
): handler is EventHandlerFn<TEvent> {
  return typeof handler === 'function';
}
