import { CommandBus } from './CommandBus';
import { CommandHandlerEntity } from './contracts';
import {
  CommandAlreadyRegisteredException,
  UnsupportedCommandHandlerException,
  CommandNotFoundException,
} from './exceptions';
import { BaseCommand } from './models';

class Command extends BaseCommand {
  public static override readonly commandName = 'Command';
}

describe('CommandBus', () => {
  let commandBus: CommandBus;

  beforeEach(() => {
    commandBus = new CommandBus();
  });

  describe('register', () => {
    it('should register a command handler', () => {
      const command = new Command();
      const handler = jest.fn();

      const unsubscribe = commandBus.register(command, handler);

      expect(commandBus.execute(command)).toBeUndefined();

      unsubscribe();

      expect(() => commandBus.execute(command)).toThrow(
        CommandNotFoundException
      );

      expect(handler).toHaveBeenCalledWith(command);
    });

    it('should throw an exception if the command is already registered', () => {
      const command = new Command();
      const handler = jest.fn();

      commandBus.register(command, handler);

      expect(() => commandBus.register(command, handler)).toThrow(
        CommandAlreadyRegisteredException
      );
    });
  });

  describe('execute', () => {
    it('should execute a command', () => {
      const command = new Command();
      const handler = jest.fn();

      commandBus.register(command, handler);
      commandBus.execute(command);

      expect(handler).toHaveBeenCalledWith(command);
    });

    it('should throw an exception if the command is not registered', () => {
      const command = new Command();

      expect(() => commandBus.execute(command)).toThrow(
        CommandNotFoundException
      );
    });

    it('should throw an exception if the command handler is invalid', () => {
      const command = new Command();

      commandBus.register(command, {} as unknown as CommandHandlerEntity);

      expect(() => commandBus.execute(command)).toThrow(
        UnsupportedCommandHandlerException
      );
    });
  });
});
