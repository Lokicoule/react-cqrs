import Subscription from './Subscription';

describe('Subscription', () => {
  it('should unsubscribe', () => {
    const onUnsubscribe = jest.fn();
    const subscription = new Subscription(onUnsubscribe);

    subscription.unsubscribe();

    expect(onUnsubscribe).toHaveBeenCalledTimes(1);
  });

  it('should unsubscribe only once', () => {
    const onUnsubscribe = jest.fn();
    const subscription = new Subscription(onUnsubscribe);

    subscription.unsubscribe();
    subscription.unsubscribe();

    expect(onUnsubscribe).toHaveBeenCalledTimes(1);
  });
});
