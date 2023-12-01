import BaseQuery from './BaseQuery';
import { QueryNameMissingException } from '../exceptions';

describe('BaseQuery', () => {
  describe('queryName', () => {
    it('should throw an exception if the query name is not defined', () => {
      class TestQuery extends BaseQuery {}

      const query = new TestQuery();

      expect(() => query.queryName).toThrow(QueryNameMissingException);
    });

    it('should return the query name if it is defined', () => {
      class TestQuery extends BaseQuery {
        public static override readonly queryName = 'test-query';
      }

      const query = new TestQuery();

      expect(query.queryName).toEqual('test-query');
    });
  });
});
