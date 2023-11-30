import { BaseQuery } from './BaseQuery';

describe('BaseCommand', () => {
  it('should override queryName', () => {
    const query = new (class Test extends BaseQuery {
      public static override readonly queryName = 'query:test';
    })();
    expect(query.queryName).toEqual('query:test');
  });
});
