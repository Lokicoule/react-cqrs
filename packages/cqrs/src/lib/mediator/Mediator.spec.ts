import { CommandBus, CommandContract, CommandHandler } from '../commands';
import { QueryBus, QueryContract, QueryHandler } from '../queries';
import Mediator from './Mediator';
import UnsupportedHandlerException from './exceptions/UnsupportedHandlerException';
import UnsupportedMessageException from './exceptions/UnsupportedMessageException';

describe('Mediator', () => {
  let mediator: Mediator;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(() => {
    commandBus = new CommandBus();
    queryBus = new QueryBus();
    mediator = new Mediator(commandBus, queryBus);
  });

  describe('subscribeToCommand', () => {
    it('should subscribe to command', () => {
      const command: CommandContract = { commandName: 'test' };
      const handler: CommandHandler = { execute: jest.fn() };

      mediator.subscribeToCommand(command, handler);

      expect(commandBus['registry'].has(command.commandName)).toBeTruthy();
    });

    it('should throw UnsupportedHandlerException if command is not a command contract', () => {
      const command = { queryName: 'test' };
      const handler: CommandHandler = { execute: jest.fn() };

      expect(() => {
        mediator.subscribeToCommand(
          command as unknown as CommandContract,
          handler
        );
      }).toThrow(UnsupportedHandlerException);
    });

    it('should throw UnsupportedHandlerException if handler is not a command handler', () => {
      const command: CommandContract = { commandName: 'test' };
      const handler: CommandHandler = {
        notExecute: jest.fn(),
      } as unknown as CommandHandler;

      expect(() => {
        mediator.subscribeToCommand(command, handler);
      }).toThrow(UnsupportedHandlerException);
    });
  });

  describe('subscribeToQuery', () => {
    it('should subscribe to query', () => {
      const query: QueryContract = { queryName: 'test' };
      const handler: QueryHandler = { execute: jest.fn() };

      mediator.subscribeToQuery(query, handler);

      expect(queryBus['registry'].has(query.queryName)).toBeTruthy();
    });

    it('should throw UnsupportedHandlerException if query is not a query contract', () => {
      const query: QueryContract = {
        commandName: 'test',
      } as unknown as QueryContract;
      const handler: QueryHandler = { execute: jest.fn() };

      expect(() => {
        mediator.subscribeToQuery(query, handler);
      }).toThrow(UnsupportedHandlerException);
    });

    it('should throw UnsupportedHandlerException if handler is not a query handler', () => {
      const query: QueryContract = { queryName: 'test' };
      const handler: QueryHandler = {
        notExecute: jest.fn(),
      } as unknown as QueryHandler;

      expect(() => {
        mediator.subscribeToQuery(query, handler);
      }).toThrow(UnsupportedHandlerException);
    });
  });

  describe('publish', () => {
    it('should publish a command', () => {
      const command: CommandContract = { commandName: 'test' };
      const handler: CommandHandler = { execute: jest.fn() };

      mediator.subscribeToCommand(command, handler);
      mediator.publish(command);

      expect(handler.execute).toHaveBeenCalled();
    });

    it('should publish a query', () => {
      const query: QueryContract = { queryName: 'test' };
      const handler: QueryHandler = { execute: jest.fn() };

      mediator.subscribeToQuery(query, handler);
      mediator.publish(query);

      expect(handler.execute).toHaveBeenCalled();
    });

    it('should throw UnsupportedMessageException if message is not a command or query', () => {
      const message = { noName: 'test' };

      expect(() => {
        mediator.publish(message as unknown as CommandContract);
      }).toThrow(UnsupportedMessageException);
    });
  });

  describe('unsubscribe', () => {
    it('should unsubscribe from command', () => {
      const command: CommandContract = { commandName: 'test' };
      const handler: CommandHandler = { execute: jest.fn() };

      mediator.subscribeToCommand(command, handler);
      mediator.unsubscribe(command);

      expect(commandBus['registry'].has(command.commandName)).toBeFalsy();
    });

    it('should unsubscribe from query', () => {
      const query: QueryContract = { queryName: 'test' };
      const handler: QueryHandler = { execute: jest.fn() };

      mediator.subscribeToQuery(query, handler);
      mediator.unsubscribe(query);

      expect(queryBus['registry'].has(query.queryName)).toBeFalsy();
    });
  });
});
