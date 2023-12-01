import BaseRegistry from './BaseRegistry';
import { RegistryContract } from './contracts';

describe('BaseRegistry', () => {
  let registry: RegistryContract<string, string>;

  beforeEach(() => {
    registry = new (class extends BaseRegistry<string, string> {})();
  });

  afterEach(() => {
    registry.clear();
  });

  it('should register a value', () => {
    const unsubscribe = registry.set('key', 'value');

    expect(registry.size).toBe(1);
    expect(registry.get('key')).toBe('value');

    unsubscribe();

    expect(registry.size).toBe(0);
    expect(registry.get('key')).toBeUndefined();
  });

  it('should return undefined if the key is not registered', () => {
    expect(registry.get('key')).toBeUndefined();
  });

  it('should return true if the key is registered', () => {
    registry.set('key', 'value');

    expect(registry.has('key')).toBe(true);
  });

  it('should return false if the key is not registered', () => {
    expect(registry.has('key')).toBe(false);
  });

  it('should clear the registry', () => {
    registry.set('key', 'value');

    expect(registry.size).toBe(1);

    registry.clear();

    expect(registry.size).toBe(0);
  });

  it('should return an iterator of keys', () => {
    registry.set('key', 'value');

    expect(Array.from(registry.keys)).toEqual(['key']);
  });

  it('should return an iterator of values', () => {
    registry.set('key', 'value');

    expect(Array.from(registry.values)).toEqual(['value']);
  });

  it('should return an iterator of entries', () => {
    registry.set('key', 'value');

    expect(Array.from(registry.entries)).toEqual([['key', 'value']]);
  });
});
