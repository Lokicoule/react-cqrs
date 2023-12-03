import { Callback } from '../../types';

export interface RegistryContract<Key, Value> {
  set(key: Key, value: Value): Callback;
  get(key: Key): Value | undefined;
  has(key: Key): boolean;
  clear(): void;
  delete(key: Key): boolean;
  readonly size: number;
  readonly keys: IterableIterator<Key>;
  readonly values: IterableIterator<Value>;
  readonly entries: IterableIterator<[Key, Value]>;
}
