import { Unsubscribe } from '../../types';

export interface RegistryContract<Key, Value> {
  set(key: Key, value: Value): Unsubscribe;
  get(key: Key): Value | undefined;
  has(key: Key): boolean;
  clear(): void;
  readonly size: number;
  readonly keys: IterableIterator<Key>;
  readonly values: IterableIterator<Value>;
  readonly entries: IterableIterator<[Key, Value]>;
}
