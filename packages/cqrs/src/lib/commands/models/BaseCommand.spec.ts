import BaseCommand from './BaseCommand';
import { CommandNameMissingException } from '../exceptions';

describe('BaseCommand', () => {
  describe('commandName', () => {
    it('should throw an exception if the command name is not defined', () => {
      class TestCommand extends BaseCommand {}

      const command = new TestCommand();

      expect(() => command.commandName).toThrow(CommandNameMissingException);
    });

    it('should return the command name if it is defined', () => {
      class TestCommand extends BaseCommand {
        public static override readonly commandName = 'test-command';
      }

      const command = new TestCommand();

      expect(command.commandName).toEqual('test-command');
    });
  });
});
