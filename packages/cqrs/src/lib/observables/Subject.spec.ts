import Observable from './Observable';

export default class Subject<T> extends Observable<T> {
  constructor() {
    super((observer) => {
      this.observers.add(observer);
    });
  }

  public next(value: T) {
    this.observers.forEach((observer) => observer.next(value));
  }

  public complete() {
    this.observers.forEach((observer) => observer.complete?.());
  }

  public error(error: Error) {
    this.observers.forEach((observer) => observer.error?.(error));
  }

  public asObservable(): Observable<T> {
    return Observable.create((observer) => {
      const subscription = this.subscribe(observer);

      return () => {
        subscription.unsubscribe();
      };
    });
  }
}

describe('Subject', () => {
  it('should be possible to publish', () => {
    const subject = new Subject<string>();

    const observer = {
      next: jest.fn(),
    };

    subject.subscribe(observer);

    subject.next('foo');

    expect(observer.next).toHaveBeenCalledWith('foo');
  });

  it('should be possible to complete', () => {
    const subject = new Subject<string>();

    const observer = {
      next: jest.fn(),
      complete: jest.fn(),
    };

    subject.subscribe(observer);

    subject.complete();

    expect(observer.complete).toHaveBeenCalled();
  });

  it('should be possible to error', () => {
    const subject = new Subject<string>();

    const observer = {
      next: jest.fn(),
      error: jest.fn(),
    };

    subject.subscribe(observer);

    subject.error(new Error('foo'));

    expect(observer.error).toHaveBeenCalledWith(new Error('foo'));
  });

  it('should be possible to convert to observable', () => {
    const subject = new Subject<string>();

    const observer = {
      next: jest.fn(),
    };

    subject.asObservable().subscribe(observer);

    subject.next('foo');

    expect(observer.next).toHaveBeenCalledWith('foo');
  });
});
