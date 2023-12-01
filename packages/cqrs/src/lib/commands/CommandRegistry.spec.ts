import { Unsubscribe } from '../types';
import CommandRegistry from './CommandRegistry';
import { CommandRegistryEntry } from './contracts';
import {
  CommandAlreadyRegisteredException,
  CommandNotFoundException,
} from './exceptions';
import { BaseCommand } from './models';

class TestCommand extends BaseCommand {
  public static override readonly commandName = 'test';
}

describe('CommandRegistry', () => {
  let registry: CommandRegistry; // We don't use the contract here because we want to use base registry methods to simplify the tests
  let handler: jest.Mock;
  let command: TestCommand = new TestCommand(); // Fix: We need to instantiate the command here because when using it.each, the command is not yet instantiated and the commandName is undefined.
  let entry: CommandRegistryEntry;
  let unsubscribe: Unsubscribe;

  beforeEach(() => {
    jest.resetAllMocks();
    registry = new CommandRegistry();
    handler = jest.fn();
    command = new TestCommand();
    entry = { handler };
    unsubscribe = registry.register(command, entry);
  });

  afterEach(() => {
    unsubscribe();
  });

  describe('register', () => {
    it('should register a command handler', () => {
      expect(registry.has(TestCommand.commandName)).toBe(true);
    });

    it.each([
      [command, entry],
      [
        new (class DuplicateCommand extends BaseCommand {
          public static override readonly commandName = 'test';
        })(),
        entry,
      ],
      [new TestCommand(), entry],
      [{ commandName: 'test' }, entry],
    ])(
      'should throw an error if the command handler is already registered',
      (key, entry) => {
        expect(() => registry.register(key, entry)).toThrow(
          CommandAlreadyRegisteredException
        );
      }
    );

    it('should register multiple command handlers', () => {
      const secondHandler = jest.fn();
      const secondCommand = new (class SecondCommand extends BaseCommand {
        public static override readonly commandName = 'second';
      })();
      const secondEntry = { handler: secondHandler };

      registry.register(secondCommand, secondEntry);

      expect(registry.has(TestCommand.commandName)).toBe(true);
      expect(registry.has(secondCommand.commandName)).toBe(true);
    });
  });

  describe('resolve', () => {
    it('should resolve a command handler', () => {
      expect(registry.resolve(command)).toBe(handler);
    });

    it('should throw an error if the command handler is not registered', () => {
      const unknownCommand = new (class UnknownCommand extends BaseCommand {
        public static override readonly commandName = 'unknown';
      })();

      expect(() => registry.resolve(unknownCommand)).toThrow(
        CommandNotFoundException
      );
    });
  });
});
