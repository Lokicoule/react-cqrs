import { QueryBus } from './QueryBus';
import { QueryHandlerContract } from './contracts';
import { QueryAlreadyRegisteredException } from './exceptions/QueryAlreadyRegisteredException';
import { QueryNotFoundException } from './exceptions';
import { BaseQuery } from './models/BaseQuery';

const simpleQuery = {
  queryName: 'query:simple',
};

class SimpleQuery extends BaseQuery {
  public static override readonly queryName = 'query:simple';
}

class PayloadQuery extends BaseQuery {
  public static override readonly queryName = 'query:payload';

  constructor(public readonly payload: string) {
    super();
  }
}

class AsyncHandlerForSimpleQuery
  implements QueryHandlerContract<SimpleQuery, Promise<void>>
{
  public async execute(): Promise<void> {
    return Promise.resolve();
  }
}

class AsyncHandlerForPayloadQuery
  implements QueryHandlerContract<PayloadQuery, Promise<string>>
{
  public execute(query: PayloadQuery): Promise<string> {
    return Promise.resolve(query.payload);
  }
}

class SyncHandlerForSimpleQuery
  implements QueryHandlerContract<SimpleQuery, void>
{
  public execute(): void {
    return;
  }
}

class SyncHandlerForPayloadQuery
  implements QueryHandlerContract<PayloadQuery, string>
{
  public execute(query: PayloadQuery): string {
    return query.payload;
  }
}

function payloadQueryHandler(query: PayloadQuery): string {
  return query.payload;
}

describe('QueryBus', () => {
  let queryBus: QueryBus;

  beforeEach(() => {
    queryBus = new QueryBus();
  });

  describe('register', () => {
    it('should register an async handler for a query', () => {
      const unsubscribe = queryBus.register(
        new SimpleQuery(),
        new AsyncHandlerForSimpleQuery()
      );
      expect(unsubscribe).toBeInstanceOf(Function);
    });

    it('should register a sync handler for a query', () => {
      const unsubscribe = queryBus.register(
        new SimpleQuery(),
        new SyncHandlerForSimpleQuery()
      );
      expect(unsubscribe).toBeInstanceOf(Function);
    });

    it('should register a function as a handler for a query', () => {
      const unsubscribe = queryBus.register(
        new PayloadQuery('payload'),
        payloadQueryHandler
      );
      expect(unsubscribe).toBeInstanceOf(Function);
    });

    it('should register an object as a query', () => {
      const unsubscribe = queryBus.register(
        simpleQuery,
        new AsyncHandlerForSimpleQuery()
      );
      expect(unsubscribe).toBeInstanceOf(Function);
    });

    it('should throw QueryAlreadyRegisteredException when a handler is already registered', () => {
      queryBus.register(new SimpleQuery(), new AsyncHandlerForSimpleQuery());
      expect(() =>
        queryBus.register(new SimpleQuery(), new AsyncHandlerForSimpleQuery())
      ).toThrow(QueryAlreadyRegisteredException);
    });
  });

  describe('execute', () => {
    it('should execute an async handler for a query', async () => {
      queryBus.register(new SimpleQuery(), new AsyncHandlerForSimpleQuery());
      await expect(
        queryBus.execute(new SimpleQuery())
      ).resolves.toBeUndefined();
    });

    it('should execute a sync handler for a query', () => {
      queryBus.register(new SimpleQuery(), new SyncHandlerForSimpleQuery());
      expect(queryBus.execute(new SimpleQuery())).toBeUndefined();
    });

    it('should execute an async handler for a query with payload', async () => {
      queryBus.register(
        new PayloadQuery('payload'),
        new AsyncHandlerForPayloadQuery()
      );
      await expect(queryBus.execute(new PayloadQuery('payload'))).resolves.toBe(
        'payload'
      );
    });

    it('should execute a sync handler for a query with payload', () => {
      queryBus.register(
        new PayloadQuery('payload'),
        new SyncHandlerForPayloadQuery()
      );
      expect(queryBus.execute(new PayloadQuery('payload'))).toBe('payload');
    });

    it('should throw QueryNotFoundException when a handler is not registered', () => {
      expect(() =>
        queryBus.execute(new SimpleQuery())
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('unregister', () => {
    it('should unregister a handler', () => {
      const unsubscribe = queryBus.register(
        new SimpleQuery(),
        new AsyncHandlerForSimpleQuery()
      );
      unsubscribe();
      expect(() => queryBus.execute(new SimpleQuery())).toThrow(
        QueryNotFoundException
      );
    });

    it('should not throw when a handler is not registered', () => {
      const unsubscribe = queryBus.register(
        new SimpleQuery(),
        new AsyncHandlerForSimpleQuery()
      );
      unsubscribe();
      expect(() => unsubscribe()).not.toThrow();
    });
  });
});
