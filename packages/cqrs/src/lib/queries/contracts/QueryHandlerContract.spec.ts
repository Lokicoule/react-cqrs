import QueryContract from './QueryContract';
import QueryHandlerContract, {
  QueryHandlerFn,
  isQueryHandler,
  isQueryHandlerContract,
  isQueryHandlerFn,
} from './QueryHandlerContract';

describe('isQueryHandlerContract', () => {
  describe('isQueryHandlerContract', () => {
    it('should return true if handler is QueryHandlerContract', () => {
      const handler = new (class
        implements QueryHandlerContract<QueryContract>
      {
        execute(): void {}
      })();

      expect(isQueryHandlerContract(handler)).toBeTruthy();
    });

    it('should return false if handler is not QueryHandlerContract', () => {
      const handler = {} as QueryHandlerContract<QueryContract>;

      expect(isQueryHandlerContract(handler)).toBeFalsy();
    });
  });

  describe('isQueryHandlerFn', () => {
    it('should return true if handler is QueryHandlerFn', () => {
      const handler = () => {};

      expect(isQueryHandlerFn(handler)).toBeTruthy();
    });

    it('should return false if handler is not QueryHandlerFn', () => {
      const handler = {} as QueryHandlerFn<QueryContract>;

      expect(isQueryHandlerFn(handler)).toBeFalsy();
    });
  });

  describe('isQueryHandler', () => {
    it('should return true if handler is QueryHandlerFn', () => {
      const handler = () => {};

      expect(isQueryHandler(handler)).toBeTruthy();
    });

    it('should return true if handler is QueryHandlerContract', () => {
      const handler = new (class
        implements QueryHandlerContract<QueryContract>
      {
        execute(): void {}
      })();

      expect(isQueryHandler(handler)).toBeTruthy();
    });

    it('should return false if handler is not QueryHandlerFn or QueryHandlerContract', () => {
      const handler = {} as QueryHandlerFn<QueryContract>;

      expect(isQueryHandler(handler)).toBeFalsy();
    });
  });
});
