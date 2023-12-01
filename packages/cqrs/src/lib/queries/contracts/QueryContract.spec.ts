import QueryContract, { isQueryContract } from './QueryContract';

describe('QueryContract', () => {
  describe('isQueryContract', () => {
    it('should return true if the value is a QueryContract', () => {
      const value: QueryContract = {
        queryName: 'test',
      };

      expect(isQueryContract(value)).toBeTruthy();
    });

    it('should return true if the value is a derived QueryContract', () => {
      const value = {
        queryName: 'test',
        payload: 'test',
      };

      expect(isQueryContract(value)).toBeTruthy();
    });

    it('should return false if the value is not a QueryContract', () => {
      const value = {};

      expect(isQueryContract(value)).toBeFalsy();
    });
  });
});
