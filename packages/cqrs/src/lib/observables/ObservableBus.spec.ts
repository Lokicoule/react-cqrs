import ObservableBus from './ObservableBus';

describe('ObservableBus', () => {
  it('should be possible to subscribe', () => {
    const bus = new (class extends ObservableBus {
      protected execute<TResult>(): TResult {
        return 42 as TResult;
      }
    })();

    const observer = {
      next: jest.fn(),
    };

    bus.subscribe(observer);

    bus.publish('foo');

    expect(observer.next).toHaveBeenCalledWith({ param: 'foo', value: 42 });
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

    const observer = {
      error: jest.fn(),
    };
    const observer2 = {
      error: jest.fn(),
    };
    bus.subscribe(observer);
    bus.subscribe(observer2);

    expect(() => bus.publish('foo')).toThrow('foo');
    expect(observer.error).toHaveBeenCalledWith({
      error: new Error('foo'),
      param: 'foo',
    });
    expect(observer.error).toHaveBeenCalledTimes(1);
    expect(observer2.error).toHaveBeenCalledWith({
      error: new Error('foo'),
      param: 'foo',
    });
    expect(observer2.error).toHaveBeenCalledTimes(1);
  });

  it('should be possible to publish with error and not throw', () => {
    const bus = new (class extends ObservableBus {
      protected execute<TResult>(): TResult {
        throw new Error('foo');
      }
    })({ throwError: false });
    const observer = {
      error: jest.fn(),
    };
    const observer2 = {
      error: jest.fn(),
    };
    bus.subscribe(observer);
    bus.subscribe(observer2);

    const result = bus.publish('foo');

    expect(result).toBeUndefined();
    expect(observer.error).toHaveBeenCalledWith({
      error: new Error('foo'),
      param: 'foo',
    });
    expect(observer.error).toHaveBeenCalledTimes(1);
    expect(observer2.error).toHaveBeenCalledWith({
      error: new Error('foo'),
      param: 'foo',
    });
    expect(observer2.error).toHaveBeenCalledTimes(1);
  });

  it('should be possible to publish with next', () => {
    const bus = new (class extends ObservableBus {
      protected execute<TResult>(): TResult {
        return 'executed' as TResult;
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

    expect(observer.next).toHaveBeenCalledWith({
      param: 'foo',
      value: 'executed',
    });
    expect(observer.next).toHaveBeenCalledTimes(1);
    expect(observer2.next).toHaveBeenCalledWith({
      param: 'foo',
      value: 'executed',
    });
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
    expect(observer.complete).toHaveBeenCalledWith({ param: 'foo' });
  });
});
