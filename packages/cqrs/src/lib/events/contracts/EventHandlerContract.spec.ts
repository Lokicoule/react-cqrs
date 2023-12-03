import EventContract from './EventContract';
import EventHandlerContract, {
  isEventHandlerContract,
} from './EventHandlerContract';

describe('isEventHandlerContract', () => {
  it('should return true if handler is EventHandlerContract', () => {
    const handler = new (class implements EventHandlerContract<EventContract> {
      handle(): void {}
    })();

    expect(isEventHandlerContract(handler)).toBeTruthy();
  });

  it('should return false if handler is not EventHandlerContract', () => {
    const handler = {} as EventHandlerContract<EventContract>;

    expect(isEventHandlerContract(handler)).toBeFalsy();
  });
});
