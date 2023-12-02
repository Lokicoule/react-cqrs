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
