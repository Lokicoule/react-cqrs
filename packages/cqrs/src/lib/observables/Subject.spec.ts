import Subject from './Subject';

describe('Subject', () => {
  it('should be possible to publish', () => {
    const subject = new Subject<string>();

    const observer = {
      next: jest.fn(),
    };

    subject.subscribe(observer);

    subject.next({ value: 'foo' });

    expect(observer.next).toHaveBeenCalledWith({ value: 'foo' });
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

    subject.error({ error: new Error('foo') });

    expect(observer.error).toHaveBeenCalledWith({ error: new Error('foo') });
  });

  it('should be possible to convert to observable', () => {
    const subject = new Subject<string>();

    const observer = {
      next: jest.fn(),
    };

    subject.asObservable().subscribe(observer);

    subject.next({ value: 'foo' });

    expect(observer.next).toHaveBeenCalledWith({ value: 'foo' });
  });
});
