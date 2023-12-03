import EventBus from './EventBus';
import { EventHandlerEntity } from './contracts';
import {
  EventNotFoundException,
  UnsupportedEventHandlerException,
} from './exceptions';
import { BaseEvent } from './models';

class Event extends BaseEvent {
  public static override readonly eventName = 'Event';
}

describe('eventBus', () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  describe('register', () => {
    it('should register a event handler', () => {
      const event = new Event();
      const handler = jest.fn();

      const Callback = eventBus.register(event, handler);

      expect(eventBus.execute(event)).toBeUndefined();

      Callback();

      expect(() => eventBus.execute(event)).toThrow(EventNotFoundException);

      expect(handler).toHaveBeenCalledWith(event);
    });

    it('should register multiple event handlers', () => {
      const event = new Event();
      const handler = jest.fn();
      const secondHandler = jest.fn();

      const Callback = eventBus.register(event, handler);
      const Callback2 = eventBus.register(event, secondHandler);

      expect(eventBus.execute(event)).toBeUndefined();

      Callback();
      Callback2();

      expect(() => eventBus.execute(event)).toThrow(EventNotFoundException);

      expect(handler).toHaveBeenCalledWith(event);
      expect(secondHandler).toHaveBeenCalledWith(event);
    });
  });

  describe('execute', () => {
    it('should execute a event', () => {
      const event = new Event();
      const handler = jest.fn();

      eventBus.register(event, handler);
      eventBus.execute(event);

      expect(handler).toHaveBeenCalledWith(event);
    });

    it('should throw an exception if the event is not registered', () => {
      const event = new Event();

      expect(() => eventBus.execute(event)).toThrow(EventNotFoundException);
    });

    it('should throw an exception if the event handler is invalid', () => {
      const event = new Event();

      eventBus.register(event, {} as unknown as EventHandlerEntity);

      expect(() => eventBus.execute(event)).toThrow(
        UnsupportedEventHandlerException
      );
    });
  });

  describe('publish', () => {
    it('should not publish a event to subscribers when we do not execute it', () => {
      const event = new Event();
      const handler = jest.fn();
      const subscriber = jest.fn();

      eventBus.subscribe({
        next: (receivedEvent) => {
          expect(receivedEvent).toBe(event);
          subscriber();
        },
      });

      eventBus.register(event, handler);

      expect(subscriber).not.toHaveBeenCalled();
      expect(handler).not.toHaveBeenCalledWith(event);
    });

    it('should publish a event to subscribers', () => {
      const event = new Event();
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

      eventBus.subscribe(observer);
      eventBus.subscribe(observer2);
      eventBus.subscribe(observer3);

      eventBus.register(event, handler);
      eventBus.publish(event);

      expect(handler).toHaveBeenCalledWith(event);
      expect(observer.next).toHaveBeenCalledWith({
        param: event,
      });
      expect(observer2.next).toHaveBeenCalledWith({
        param: event,
      });
      expect(observer3.next).toHaveBeenCalledWith({
        param: event,
      });
      expect(observer.next).toHaveBeenCalledTimes(1);
      expect(observer2.next).toHaveBeenCalledTimes(1);
      expect(observer3.next).toHaveBeenCalledTimes(1);
    });
  });

  describe('options', () => {
    it('should be possible to publish with error and not throw', () => {
      eventBus = new EventBus({ throwError: false });

      const result = eventBus.publish(new Event());

      expect(result).toBeUndefined();
    });

    it('should be possible to publish with error and throw', () => {
      eventBus = new EventBus({ throwError: true });
      expect(() => eventBus.publish(new Event())).toThrow(
        EventNotFoundException
      );
    });

    it('should be possible to publish with complete', () => {
      eventBus = new EventBus({ throwError: false });

      const observer = {
        next: jest.fn(),
        complete: jest.fn(),
      };

      eventBus.subscribe(observer);

      eventBus.publish(new Event());

      expect(observer.complete).toHaveBeenCalled();
    });
  });
});
