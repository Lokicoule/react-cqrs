import { EventBus } from './EventBus';
import { EventNotFoundException } from './exceptions';
import { BaseEvent } from './models/BaseEvent';

class ExampleEvent extends BaseEvent {
  public static override readonly eventName = 'event:test';

  constructor(public readonly payload: string) {
    super();
  }
}

describe('EventBus', () => {
  let bus: EventBus;

  beforeEach(() => {
    bus = new EventBus();
  });

  describe('register', () => {
    it('should register a handler for an object event', () => {
      const handler = jest.fn();
      const event = { eventName: 'test' };

      bus.register(event, handler);

      bus.handle(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should register a handler for a class event', () => {
      const handler = jest.fn();
      const event = new ExampleEvent('test');

      bus.register(event, handler);

      bus.handle(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should return an unsubscribe function', () => {
      const handler = jest.fn();
      const event = { eventName: 'test' };

      const unsubscribe = bus.register(event, handler);

      unsubscribe();

      bus.handle(event);

      expect(handler).not.toHaveBeenCalled();
    });

    it('should register multiple handlers for an event', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      const event = { eventName: 'test' };

      bus.register(event, handler1);
      bus.register(event, handler2);

      bus.handle(event);

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
    });

    it('should register multiple handlers for multiple events', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      const handler3 = jest.fn();
      const handler4 = jest.fn();
      const event1 = { eventName: 'test1' };
      const event2 = { eventName: 'test2' };

      bus.register(event1, handler1);
      bus.register(event1, handler2);
      bus.register(event2, handler3);
      bus.register(event2, handler4);

      bus.handle(event1);
      bus.handle(event2);

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
      expect(handler3).toHaveBeenCalledTimes(1);
      expect(handler4).toHaveBeenCalledTimes(1);
    });
  });

  describe('handle', () => {
    it('should execute a handler for an object event', () => {
      const handler = jest.fn();
      const event = { eventName: 'test' };

      bus.register(event, handler);

      bus.handle(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should execute a handler for a class event', () => {
      const handler = jest.fn();
      const event = new ExampleEvent('test');

      bus.register(event, handler);

      bus.handle(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should execute multiple handlers for an event', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      const event = { eventName: 'test' };

      bus.register(event, handler1);
      bus.register(event, handler2);

      bus.handle(event);

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
    });

    it('should execute multiple handlers for multiple events', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      const handler3 = jest.fn();
      const handler4 = jest.fn();
      const event1 = { eventName: 'test1' };
      const event2 = { eventName: 'test2' };

      bus.register(event1, handler1);
      bus.register(event1, handler2);
      bus.register(event2, handler3);
      bus.register(event2, handler4);

      bus.handle(event1);
      bus.handle(event2);

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
      expect(handler3).toHaveBeenCalledTimes(1);
      expect(handler4).toHaveBeenCalledTimes(1);
    });

    it('should throw EventNotFoundException when a handler is not registered', () => {
      expect(() => bus.handle({ eventName: 'test' })).toThrow(
        EventNotFoundException
      );
    });
  });

  describe('unsubscribe', () => {
    it('should unregister a handler for an object event', () => {
      const handler = jest.fn();
      const event = { eventName: 'test' };

      const unsubscribe = bus.register(event, handler);

      unsubscribe();

      bus.handle(event);

      expect(handler).not.toHaveBeenCalled();
    });

    it('should unregister a handler for a class event', () => {
      const handler = jest.fn();
      const event = new ExampleEvent('test');

      const unsubscribe = bus.register(event, handler);

      unsubscribe();

      bus.handle(event);

      expect(handler).not.toHaveBeenCalled();
    });
  });
});
