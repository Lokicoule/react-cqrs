import ObservableBus from './ObservableBus';
import Observer from './Observer';

class TestBus extends ObservableBus {}

describe('ObservableBus', () => {
  describe('subscribe', () => {
    it('should return a callback', () => {
      const bus = new TestBus();
      const observer = new Observer(() => {});

      const callback = bus.subscribe(observer);

      expect(callback).toBeInstanceOf(Function);
    });

    it('should return a callback that removes the observer when called', () => {
      const bus = new TestBus();

      const callback = bus.subscribe(new Observer(() => {}));
      const callback2 = bus.subscribe(new Observer(() => {}));

      expect(bus['publisher']['observers'].size).toBe(2);

      callback();

      expect(bus['publisher']['observers'].size).toBe(1);

      callback2();

      expect(bus['publisher']['observers'].size).toBe(0);
    });
  });

  describe('publish', () => {
    it('should call next on the publisher', () => {
      const bus = new TestBus();
      const observer = new Observer(() => {});
      const spy = jest.spyOn(bus['publisher'], 'next');

      bus.subscribe(observer);
      bus.publish({});

      expect(spy).toHaveBeenCalled();
    });
  });
});
