import { IocContainer } from './IocContainer';
import { IocContainerContract } from './contracts';
import { DependencyNotFoundException } from './exceptions/DependencyNotFoundException';

describe('IoCContainer', () => {
  let container: IocContainerContract;

  beforeEach(() => {
    container = new IocContainer();
  });

  describe('register', () => {
    it('should register a dependency', () => {
      const dependency = {};

      container.register('dependency', dependency);

      expect(container.resolve('dependency')).toBe(dependency);
    });
  });

  describe('resolve', () => {
    it('should resolve a dependency', () => {
      const dependency = {};

      container.register('dependency', dependency);

      expect(container.resolve('dependency')).toBe(dependency);
    });

    it('should throw an error if the dependency is not found', () => {
      expect(() => container.resolve('dependency')).toThrowError(
        DependencyNotFoundException
      );
    });
  });
});
