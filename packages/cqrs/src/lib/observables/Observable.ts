import { Observer } from './Observer';
import Subscription from './Subscription';

export default class Observable<T> {
  protected observers: Set<Observer<T>> = new Set();

  protected constructor(private producer: (observer: Observer<T>) => void) {}

  public static create<T>(
    producer: (observer: Observer<T>) => void
  ): Observable<T> {
    return new Observable(producer);
  }

  public subscribe(observer: Observer<T>): Subscription {
    this.observers.add(observer);

    const subscription = new Subscription(() => {
      this.observers.delete(observer);
    });

    this.producer(observer);

    return subscription;
  }
}
