import { Registry } from './Registry';
import { RegistryContract } from './contracts';
import { DependencyNotFoundException } from './exceptions/DependencyNotFoundException';

describe('Registry', () => {
  let registry: RegistryContract;

  beforeEach(() => {
    registry = new Registry();
  });

  afterEach(() => {
    registry.clear();
  });

  describe('register', () => {
    it('should register a dependency', () => {
      const token = 'token';
      const provider = { useClass: class {} };

      registry.register(token, provider);

      expect(registry.getDependencies().get(token)).toEqual({ provider });
    });
  });

  describe('resolve', () => {
    it('should resolve a dependency', () => {
      const token = 'token';
      const provider = { useClass: class {} };

      registry.register(token, provider);

      expect(registry.resolve(token)).toBeInstanceOf(provider.useClass);
    });

    it('should throw an error if the dependency is not found', () => {
      const token = 'token';

      expect(() => registry.resolve(token)).toThrowError(
        new DependencyNotFoundException(token)
      );
    });

    it('should return the same instance if it has already been resolved', () => {
      const token = 'token';
      const provider = { useClass: class {} };

      registry.register(token, provider);

      const instance = registry.resolve(token);

      expect(registry.resolve(token)).toBe(instance);
    });
  });

  describe('clear', () => {
    it('should clear all dependencies', () => {
      const token = 'token';
      const provider = { useClass: class {} };

      registry.register(token, provider);

      registry.clear();

      expect(registry.getDependencies().size).toBe(0);
    });
  });

  describe('getDependencies', () => {
    it('should return all dependencies', () => {
      const token = 'token';
      const provider = { useClass: class {} };

      registry.register(token, provider);

      expect(registry.getDependencies().get(token)).toEqual({ provider });
    });
  });

  describe('getDependency', () => {
    it('should return a dependency', () => {
      const token = 'token';
      const provider = { useClass: class {} };

      registry.register(token, provider);

      expect(registry.getDependency(token)).toEqual({ provider });
    });

    it('should return undefined if the dependency is not found', () => {
      const token = 'token';

      expect(registry.getDependency(token)).toBeUndefined();
    });
  });
});
