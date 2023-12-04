import QueryBus from './QueryBus';
import { QueryHandler } from './contracts';
import {
  QueryAlreadyRegisteredException,
  QueryNotFoundException,
  UnsupportedQueryHandlerException,
} from './exceptions';
import { BaseQuery } from './models';

class Query extends BaseQuery {
  public static override readonly queryName = 'Query';
}

describe('queryBus', () => {
  let queryBus: QueryBus;

  beforeEach(() => {
    queryBus = new QueryBus();
  });

  describe('register', () => {
    it('should register a query handler', () => {
      const query = new Query();
      const handler = jest.fn();

      const Callback = queryBus.register(query, handler);

      expect(queryBus.execute(query)).toBeUndefined();

      Callback();

      expect(() => queryBus.execute(query)).toThrow(QueryNotFoundException);

      expect(handler).toHaveBeenCalledWith(query);
    });

    it('should throw an exception if the query is already registered', () => {
      const query = new Query();
      const handler = jest.fn();

      queryBus.register(query, handler);

      expect(() => queryBus.register(query, handler)).toThrow(
        QueryAlreadyRegisteredException
      );
    });
  });

  describe('execute', () => {
    it('should execute a query', () => {
      const query = new Query();
      const handler = jest.fn();

      queryBus.register(query, handler);
      queryBus.execute(query);

      expect(handler).toHaveBeenCalledWith(query);
    });

    it('should throw an exception if the query is not registered', () => {
      const query = new Query();

      expect(() => queryBus.execute(query)).toThrow(QueryNotFoundException);
    });

    it('should throw an exception if the query handler is invalid', () => {
      const query = new Query();

      queryBus.register(query, {} as unknown as QueryHandler);

      expect(() => queryBus.execute(query)).toThrow(
        UnsupportedQueryHandlerException
      );
    });
  });

  describe('publish', () => {
    it('should not publish a query to subscribers when we do not execute it', () => {
      const query = new Query();
      const handler = jest.fn();
      const subscriber = jest.fn();

      queryBus.subscribe({
        next: (receivedQuery) => {
          expect(receivedQuery).toBe(query);
          subscriber();
        },
      });

      queryBus.register(query, handler);

      expect(subscriber).not.toHaveBeenCalled();
      expect(handler).not.toHaveBeenCalledWith(query);
    });

    it('should publish a query to subscribers', () => {
      const query = new Query();
      const handler = jest.fn();

      const observer = {
        next: jest.fn(),
      };
      const observer2 = {
        next: jest.fn(),
      };
      const observer3 = {
        next: jest.fn(),
      };

      queryBus.subscribe(observer);
      queryBus.subscribe(observer2);
      queryBus.subscribe(observer3);

      queryBus.register(query, handler);
      queryBus.publish(query);

      expect(handler).toHaveBeenCalledWith(query);
      expect(observer.next).toHaveBeenCalledWith({
        param: query,
      });
      expect(observer2.next).toHaveBeenCalledWith({
        param: query,
      });
      expect(observer3.next).toHaveBeenCalledWith({
        param: query,
      });
      expect(observer.next).toHaveBeenCalledTimes(1);
      expect(observer2.next).toHaveBeenCalledTimes(1);
      expect(observer3.next).toHaveBeenCalledTimes(1);
    });
  });

  describe('options', () => {
    it('should be possible to publish with error and not throw', () => {
      queryBus = new QueryBus({ throwError: false });

      const result = queryBus.publish(new Query());

      expect(result).toBeUndefined();
    });

    it('should be possible to publish with error and throw', () => {
      queryBus = new QueryBus({ throwError: true });
      expect(() => queryBus.publish(new Query())).toThrow(
        QueryNotFoundException
      );
    });

    it('should be possible to publish with complete', () => {
      queryBus = new QueryBus({ throwError: false });

      const observer = {
        next: jest.fn(),
        complete: jest.fn(),
      };

      queryBus.subscribe(observer);

      queryBus.publish(new Query());

      expect(observer.complete).toHaveBeenCalled();
    });
  });
});
