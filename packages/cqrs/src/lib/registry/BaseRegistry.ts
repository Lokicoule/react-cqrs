import { Unsubscribe } from '../types';
import { RegistryContract } from './contracts';

export default abstract class BaseRegistry<Key, Value>
  implements RegistryContract<Key, Value>
{
  private readonly handlers = new Map<Key, Value>();

  public set(key: Key, value: Value): Unsubscribe {
    this.handlers.set(key, value);

    return () => {
      this.handlers.delete(key);
    };
  }

  public get(key: Key): Value | undefined {
    const entry = this.handlers.get(key);

    return entry;
  }

  public has(key: Key): boolean {
    return this.handlers.has(key);
  }

  public clear(): void {
    this.handlers.clear();
  }

  public get size(): number {
    return this.handlers.size;
  }

  public get keys(): IterableIterator<Key> {
    return this.handlers.keys();
  }

  public get values(): IterableIterator<Value> {
    return this.handlers.values();
  }

  public get entries(): IterableIterator<[Key, Value]> {
    return this.handlers.entries();
  }
}
