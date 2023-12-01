import { Observer } from '../observables';
import QueryBus from './QueryBus';
import { QueryHandlerEntity } from './contracts';
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

      queryBus.register(query, {} as unknown as QueryHandlerEntity);

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

      queryBus.subscribe(
        new Observer((receivedQuery) => {
          expect(receivedQuery).toBe(query);
          subscriber();
        })
      );

      queryBus.register(query, handler);

      expect(subscriber).not.toHaveBeenCalled();
      expect(handler).not.toHaveBeenCalledWith(query);
    });

    it('should publish a query to subscribers', () => {
      const query = new Query();
      const handler = jest.fn();
      const subscriber = jest.fn();
      const subscriber2 = jest.fn();
      const subscriber3 = jest.fn();

      queryBus.subscribe(
        new Observer((receivedQuery) => {
          expect(receivedQuery).toBe(query);
          subscriber();
        })
      );
      queryBus.subscribe(
        new Observer((receivedQuery) => {
          expect(receivedQuery).toBe(query);
          subscriber2();
        })
      );
      queryBus.subscribe(
        new Observer((receivedQuery) => {
          expect(receivedQuery).toBe(query);
          subscriber3();
        })
      );

      queryBus.register(query, handler);
      queryBus.execute(query);

      expect(subscriber).toHaveBeenCalled();
      expect(subscriber2).toHaveBeenCalled();
      expect(subscriber3).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith(query);
    });
  });
});
