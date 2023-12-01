import { Observer } from '../observables';
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

      commandBus.subscribe(
        new Observer((receivedCommand) => {
          expect(receivedCommand).toBe(command);
          subscriber();
        })
      );

      commandBus.register(command, handler);

      expect(subscriber).not.toHaveBeenCalled();
      expect(handler).not.toHaveBeenCalledWith(command);
    });

    it('should publish a command to subscribers', () => {
      const command = new Command();
      const handler = jest.fn();
      const subscriber = jest.fn();
      const subscriber2 = jest.fn();
      const subscriber3 = jest.fn();

      commandBus.subscribe(
        new Observer((receivedCommand) => {
          expect(receivedCommand).toBe(command);
          subscriber();
        })
      );
      commandBus.subscribe(
        new Observer((receivedCommand) => {
          expect(receivedCommand).toBe(command);
          subscriber2();
        })
      );
      commandBus.subscribe(
        new Observer((receivedCommand) => {
          expect(receivedCommand).toBe(command);
          subscriber3();
        })
      );

      commandBus.register(command, handler);
      commandBus.execute(command);

      expect(subscriber).toHaveBeenCalled();
      expect(subscriber2).toHaveBeenCalled();
      expect(subscriber3).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith(command);
    });
  });
});
