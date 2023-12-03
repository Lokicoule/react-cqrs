import { Callback } from '../../types';
import EventContract from './EventContract';

export type EventRegistryEntry<T = unknown> = {
  handler: T;
};

export default interface EventRegistryContract<
  TEvent extends EventContract,
  TResult
> {
  register(event: TEvent, entry: EventRegistryEntry<TResult>): Callback;
  resolve(event: TEvent): Array<TResult>;
}
