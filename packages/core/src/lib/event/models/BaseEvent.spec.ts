import { BaseEvent } from './BaseEvent';

describe('BaseCommand', () => {
  it('should override eventName', () => {
    const event = new (class Test extends BaseEvent {
      public static override readonly eventName = 'event:test';
    })();
    expect(event.eventName).toEqual('event:test');
  });
});
