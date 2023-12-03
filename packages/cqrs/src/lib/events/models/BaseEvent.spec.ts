import BaseEvent from './BaseEvent';
import { EventNameMissingException } from '../exceptions';

describe('BaseEvent', () => {
  describe('eventName', () => {
    it('should throw an exception if the event name is not defined', () => {
      class TestEvent extends BaseEvent {}

      const event = new TestEvent();

      expect(() => event.eventName).toThrow(EventNameMissingException);
    });

    it('should return the event name if it is defined', () => {
      class TestEvent extends BaseEvent {
        public static override readonly eventName = 'test-event';
      }

      const event = new TestEvent();

      expect(event.eventName).toEqual('test-event');
    });
  });
});
