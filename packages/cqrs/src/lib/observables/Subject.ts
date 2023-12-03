import Observable from './Observable';
import {
  ObserverCompleteProps,
  ObserverErrorProps,
  ObserverNextProps,
} from './Observer';

export default class Subject<T> extends Observable<T> {
  constructor() {
    super((observer) => {
      this.observers.add(observer);
    });
  }

  public next<TValue>(props: ObserverNextProps<T, TValue>) {
    this.observers.forEach((observer) => observer.next?.(props));
  }

  public complete(props?: ObserverCompleteProps<T>) {
    this.observers.forEach((observer) => observer.complete?.(props));
  }

  public error(props: ObserverErrorProps<T>) {
    this.observers.forEach((observer) => observer.error?.(props));
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
