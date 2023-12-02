import CommandBus from './CommandBus';
import { CommandHandlerEntity } from './contracts';
import {
  CommandAlreadyRegisteredException,
  CommandNotFoundException,
  UnsupportedCommandHandlerException,
} from './exceptions';
import { BaseCommand } from './models';

class Command extends BaseCommand {
  public static override readonly commandName = 'Command';
}

describe('commandBus', () => {
  let commandBus: CommandBus;

  beforeEach(() => {
    commandBus = new CommandBus();
  });

  describe('register', () => {
    it('should register a command handler', () => {
      const command = new Command();
      const handler = jest.fn();

      const Callback = commandBus.register(command, handler);

      expect(commandBus.execute(command)).toBeUndefined();

      Callback();

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

  describe('publish', () => {
    it('should not publish a command to subscribers when we do not execute it', () => {
      const command = new Command();
      const handler = jest.fn();
      const subscriber = jest.fn();

      commandBus.subscribe({
        next: (receivedCommand) => {
          expect(receivedCommand).toBe(command);
          subscriber();
        },
      });

      commandBus.register(command, handler);

      expect(subscriber).not.toHaveBeenCalled();
      expect(handler).not.toHaveBeenCalledWith(command);
    });

    it('should publish a command to subscribers', () => {
      const command = new Command();
      const handler = jest.fn();

      const observer = {
        next: jest.fn(),
      };
      const observer2 = {
        next: jest.fn(),
      };
      const observer3 = {
        next: jest.fn(),
      };

      commandBus.subscribe(observer);
      commandBus.subscribe(observer2);
      commandBus.subscribe(observer3);

      commandBus.register(command, handler);
      commandBus.publish(command);

      expect(handler).toHaveBeenCalledWith(command);
      expect(observer.next).toHaveBeenCalledWith(command);
      expect(observer2.next).toHaveBeenCalledWith(command);
      expect(observer3.next).toHaveBeenCalledWith(command);
      expect(observer.next).toHaveBeenCalledTimes(1);
      expect(observer2.next).toHaveBeenCalledTimes(1);
      expect(observer3.next).toHaveBeenCalledTimes(1);
    });
  });

  describe('options', () => {
    it('should be possible to publish with error and not throw', () => {
      commandBus = new CommandBus({ throwError: false });

      const result = commandBus.publish(new Command());

      expect(result).toBeUndefined();
    });

    it('should be possible to publish with error and throw', () => {
      commandBus = new CommandBus({ throwError: true });
      expect(() => commandBus.publish(new Command())).toThrow(
        CommandNotFoundException
      );
    });

    it('should be possible to publish with complete', () => {
      commandBus = new CommandBus({ throwError: false });

      const observer = {
        next: jest.fn(),
        complete: jest.fn(),
      };

      commandBus.subscribe(observer);

      commandBus.publish(new Command());

      expect(observer.complete).toHaveBeenCalled();
    });
  });
});
