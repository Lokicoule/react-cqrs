import ObservableBus from './ObservableBus';

describe('ObservableBus', () => {
  it('should be possible to subscribe', () => {
    const bus = new (class extends ObservableBus {
      protected execute<TResult>(): TResult {
        return {} as TResult;
      }
    })();

    const observer = {
      next: jest.fn(),
    };

    bus.subscribe(observer);

    bus.publish('foo');

    expect(observer.next).toHaveBeenCalledWith('foo');
  });

  it('should be possible to publish', () => {
    const bus = new (class extends ObservableBus {
      protected execute<TResult>(): TResult {
        return {} as TResult;
      }
    })();

    const result = bus.publish('foo');

    expect(result).toEqual({});
  });

  it('should be possible to publish with error and throw', () => {
    const bus = new (class extends ObservableBus {
      protected execute<TResult>(): TResult {
        throw new Error('foo');
      }
    })({ throwError: true });

    expect(() => bus.publish('foo')).toThrow('foo');
  });

  it('should be possible to publish with error and not throw', () => {
    const bus = new (class extends ObservableBus {
      protected execute<TResult>(): TResult {
        throw new Error('foo');
      }
    })({ throwError: false });

    const result = bus.publish('foo');

    expect(result).toBeUndefined();
  });

  it('should be possible to publish with next', () => {
    const bus = new (class extends ObservableBus {
      protected execute<TResult>(): TResult {
        return {} as TResult;
      }
    })();

    const observer = {
      next: jest.fn(),
    };
    const observer2 = {
      next: jest.fn(),
    };

    bus.subscribe(observer);
    bus.subscribe(observer2);

    bus.publish('foo');

    expect(observer.next).toHaveBeenCalledWith('foo');
    expect(observer.next).toHaveBeenCalledTimes(1);
    expect(observer2.next).toHaveBeenCalledWith('foo');
    expect(observer2.next).toHaveBeenCalledTimes(1);
  });

  it('should be possible to publish with complete', () => {
    const bus = new (class extends ObservableBus {
      protected execute<TResult>(): TResult {
        return {} as TResult;
      }
    })();

    const observer = {
      next: jest.fn(),
      complete: jest.fn(),
    };

    bus.subscribe(observer);

    bus.publish('foo');

    expect(observer.complete).toHaveBeenCalledTimes(1);
  });
});
