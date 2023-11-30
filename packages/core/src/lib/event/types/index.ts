import { Either } from '../../shared/types';
import { EventContract, EventHandlerContract } from '../contracts';

/**
 * @name EventHandlerFn
 * @description Allows for a query handler to be registered as a function.
 * @param command - The query to execute.
 * @returns The result of the query handler.
 */
export type EventHandlerFn<TEvent extends EventContract = EventContract> = (
  command: TEvent
) => EventResult;

/**
 * @name EventHandler
 * @description A query handler can be registered as a function or as an object that implements the `EventHandlerContract`.
 * @param command - The query to execute.
 * @returns The result of the query handler.
 */
export type EventHandler<TEvent extends EventContract = EventContract> = Either<
  EventHandlerContract<TEvent>,
  EventHandlerFn<TEvent>
>;

export type EventResult = Either<void, Promise<void>>;
