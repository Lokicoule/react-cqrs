import { CommandBusContract } from '../command';
import { EventBusContract } from '../event';
import { QueryBusContract } from '../query';
import { Mediator } from './Mediator';

describe('Mediator', () => {
  let mediator: Mediator;
  let commandBus: CommandBusContract;
  let eventBus: EventBusContract;
  let queryBus: QueryBusContract;

  beforeEach(() => {
    commandBus = {
      execute: jest.fn(),
      register: jest.fn(),
    };
    eventBus = {
      handle: jest.fn(),
      register: jest.fn(),
    };
    queryBus = {
      execute: jest.fn(),
      register: jest.fn(),
    };

    mediator = new Mediator(commandBus, eventBus, queryBus);
  });

  describe('execute', () => {
    it('should call commandBus.execute', () => {
      const command = { commandName: 'command' };
      const result = 'result';
      (commandBus.execute as jest.Mock).mockReturnValueOnce(result);

      expect(mediator.execute(command)).toBe(result);
      expect(commandBus.execute).toHaveBeenCalledWith(command);
    });
  });

  describe('dispatch', () => {
    it('should call eventBus.handle', () => {
      const event = { eventName: 'event' };
      const result = 'result';
      (eventBus.handle as jest.Mock).mockReturnValueOnce(result);

      expect(mediator.dispatch(event)).toBe(result);
      expect(eventBus.handle).toHaveBeenCalledWith(event);
    });
  });

  describe('query', () => {
    it('should call queryBus.execute', () => {
      const query = { queryName: 'query' };
      const result = 'result';
      (queryBus.execute as jest.Mock).mockReturnValueOnce(result);

      expect(mediator.query(query)).toBe(result);
      expect(queryBus.execute).toHaveBeenCalledWith(query);
    });
  });

  describe('registerCommand', () => {
    it('should call commandBus.register', () => {
      const command = { commandName: 'command' };
      const handler = { execute: jest.fn() };
      const unsubscribe = 'unsubscribe';
      (commandBus.register as jest.Mock).mockReturnValueOnce(unsubscribe);

      expect(mediator.registerCommand(command, handler)).toBe(unsubscribe);
      expect(commandBus.register).toHaveBeenCalledWith(command, handler);
    });
  });

  describe('registerEvent', () => {
    it('should call eventBus.register', () => {
      const event = { eventName: 'event' };
      const handler = { handle: jest.fn() };
      const unsubscribe = 'unsubscribe';
      (eventBus.register as jest.Mock).mockReturnValueOnce(unsubscribe);

      expect(mediator.registerEvent(event, handler)).toBe(unsubscribe);
      expect(eventBus.register).toHaveBeenCalledWith(event, handler);
    });
  });

  describe('registerQuery', () => {
    it('should call queryBus.register', () => {
      const query = { queryName: 'query' };
      const handler = { execute: jest.fn() };
      const unsubscribe = 'unsubscribe';
      (queryBus.register as jest.Mock).mockReturnValueOnce(unsubscribe);

      expect(mediator.registerQuery(query, handler)).toBe(unsubscribe);
      expect(queryBus.register).toHaveBeenCalledWith(query, handler);
    });
  });
});
