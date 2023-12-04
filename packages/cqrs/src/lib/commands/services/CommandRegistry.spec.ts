import { Callback } from '../../types';
import { CommandRegistryEntry } from '../contracts';
import {
  CommandAlreadyRegisteredException,
  CommandNotFoundException,
} from '../exceptions';
import { BaseCommand } from '../models';
import CommandRegistry from './CommandRegistry';

class TestCommand extends BaseCommand {
  public static override readonly commandName = 'test';
}

describe('CommandRegistry', () => {
  let registry: CommandRegistry;
  let handler: jest.Mock;
  let command: TestCommand = new TestCommand(); // Fix: We need to instantiate the command here because when using it.each, the command is not yet instantiated and the commandName is undefined.
  let entry: CommandRegistryEntry;
  let Callback: Callback;

  beforeEach(() => {
    jest.resetAllMocks();
    registry = new CommandRegistry();
    handler = jest.fn();
    command = new TestCommand();
    entry = { handler };
    Callback = registry.register(command, entry);
  });

  afterEach(() => {
    Callback();
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
