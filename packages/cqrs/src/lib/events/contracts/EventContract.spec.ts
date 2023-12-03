import EventContract, { isEventContract } from './EventContract';

describe('EventContract', () => {
  describe('isEventContract', () => {
    it('should return true if the value is a EventContract', () => {
      const value: EventContract = {
        eventName: 'test',
      };

      expect(isEventContract(value)).toBeTruthy();
    });

    it('should return true if the value is a derived EventContract', () => {
      const value = {
        eventName: 'test',
        payload: 'test',
      };

      expect(isEventContract(value)).toBeTruthy();
    });

    it('should return false if the value is not a EventContract', () => {
      const value = {};

      expect(isEventContract(value)).toBeFalsy();
    });
  });
});
