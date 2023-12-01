import QueryContract from './QueryContract';
import QueryHandlerContract, {
  isQueryHandlerContract,
} from './QueryHandlerContract';

describe('isQueryHandlerContract', () => {
  it('should return true if handler is QueryHandlerContract', () => {
    const handler = new (class implements QueryHandlerContract<QueryContract> {
      execute(): void {}
    })();

    expect(isQueryHandlerContract(handler)).toBeTruthy();
  });

  it('should return false if handler is not QueryHandlerContract', () => {
    const handler = {} as QueryHandlerContract<QueryContract>;

    expect(isQueryHandlerContract(handler)).toBeFalsy();
  });
});
