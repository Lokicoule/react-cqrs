import { CommandContract, isCommandContract } from './command.contract';

describe('CommandContract', () => {
  describe('isCommandContract', () => {
    it('should return true if the value is a CommandContract', () => {
      const value: CommandContract = {
        commandName: 'test',
      };

      expect(isCommandContract(value)).toBeTruthy();
    });

    it('should return true if the value is a derived CommandContract', () => {
      const value = {
        commandName: 'test',
        payload: 'test',
      };

      expect(isCommandContract(value)).toBeTruthy();
    });

    it('should return false if the value is not a CommandContract', () => {
      const value = {};

      expect(isCommandContract(value)).toBeFalsy();
    });
  });
});
