import { Callback } from '../../types';
import { EventContract } from '../contracts';
import { EventNotFoundException } from '../exceptions';
import EventRegistry from './EventRegistry';

describe('EventRegistry', () => {
  let registry: EventRegistry;
  let event: EventContract;
  let handler: Callback;

  beforeEach(() => {
    registry = new EventRegistry();
    event = { eventName: 'test' };
    handler = () => {};
  });

  describe('register', () => {
    it('should register an event', () => {
      registry.register(event, { handler });

      expect(registry.has(event.eventName)).toBeTruthy();
    });

    it('should register multiple events', () => {
      registry.register(event, { handler });
      registry.register(event, { handler });

      expect(registry.has(event.eventName)).toBeTruthy();
    });

    it('should return a callback to unregister the event', () => {
      const unregister = registry.register(event, { handler });

      unregister();

      expect(registry.has(event.eventName)).toBeFalsy();
    });
  });

  describe('resolve', () => {
    it('should resolve an event', () => {
      registry.register(event, { handler });

      expect(registry.resolve(event)).toEqual([handler]);
    });

    it('should resolve multiple events', () => {
      registry.register(event, { handler });
      registry.register(event, { handler });

      expect(registry.resolve(event)).toEqual([handler, handler]);
    });

    it('should throw an error if the event is not registered', () => {
      expect(() => registry.resolve(event)).toThrowError(
        EventNotFoundException
      );
    });
  });
});
