import Observable from './Observable';
import Subscription from './Subscription';

describe('Observable', () => {
  describe('subscribe', () => {
    it('should return a subscription', () => {
      const observable = Observable.create(() => {});
      const observer = {
        next: () => {},
      };

      const subscription = observable.subscribe(observer);

      expect(subscription).toBeInstanceOf(Subscription);
    });

    it('should call the producer', () => {
      const producer = jest.fn();
      const observable = Observable.create(producer);
      const observer = {
        next: () => {},
      };

      observable.subscribe(observer);

      expect(producer).toHaveBeenCalledWith(observer);
    });

    it('should add the observer to the observers', () => {
      const observable = Observable.create(() => {});
      const observer = {
        next: () => {},
      };

      observable.subscribe(observer);

      expect(observable['observers'].size).toBe(1);
    });

    it('should return a subscription that removes the observer', () => {
      const observable = Observable.create(() => {});
      const observer = {
        next: () => {},
      };

      const subscription = observable.subscribe(observer);

      subscription.unsubscribe();

      expect(observable['observers'].size).toBe(0);
    });
  });
});
