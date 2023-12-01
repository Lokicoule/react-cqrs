import { Callback } from '../../types';
import QueryRegistry from './QueryRegistry';
import { QueryRegistryEntry } from '../contracts';
import {
  QueryAlreadyRegisteredException,
  QueryNotFoundException,
} from '../exceptions';
import { BaseQuery } from '../models';

class TestQuery extends BaseQuery {
  public static override readonly queryName = 'test';
}

describe('QueryRegistry', () => {
  let registry: QueryRegistry; // We don't use the contract here because we want to use base registry methods to simplify the tests
  let handler: jest.Mock;
  let query: TestQuery = new TestQuery(); // Fix: We need to instantiate the query here because when using it.each, the query is not yet instantiated and the queryName is undefined.
  let entry: QueryRegistryEntry;
  let Callback: Callback;

  beforeEach(() => {
    jest.resetAllMocks();
    registry = new QueryRegistry();
    handler = jest.fn();
    query = new TestQuery();
    entry = { handler };
    Callback = registry.register(query, entry);
  });

  afterEach(() => {
    Callback();
  });

  describe('register', () => {
    it('should register a query handler', () => {
      expect(registry.has(TestQuery.queryName)).toBe(true);
    });

    it.each([
      [query, entry],
      [
        new (class DuplicateQuery extends BaseQuery {
          public static override readonly queryName = 'test';
        })(),
        entry,
      ],
      [new TestQuery(), entry],
      [{ queryName: 'test' }, entry],
    ])(
      'should throw an error if the query handler is already registered',
      (key, entry) => {
        expect(() => registry.register(key, entry)).toThrow(
          QueryAlreadyRegisteredException
        );
      }
    );

    it('should register multiple query handlers', () => {
      const secondHandler = jest.fn();
      const secondQuery = new (class SecondQuery extends BaseQuery {
        public static override readonly queryName = 'second';
      })();
      const secondEntry = { handler: secondHandler };

      registry.register(secondQuery, secondEntry);

      expect(registry.has(TestQuery.queryName)).toBe(true);
      expect(registry.has(secondQuery.queryName)).toBe(true);
    });
  });

  describe('resolve', () => {
    it('should resolve a query handler', () => {
      expect(registry.resolve(query)).toBe(handler);
    });

    it('should throw an error if the query handler is not registered', () => {
      const unknownQuery = new (class UnknownQuery extends BaseQuery {
        public static override readonly queryName = 'unknown';
      })();

      expect(() => registry.resolve(unknownQuery)).toThrow(
        QueryNotFoundException
      );
    });
  });
});
