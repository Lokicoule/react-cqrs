import { Callback } from '../types';
import Observer from './Observer';

export default class Subject<T> {
  private readonly observers: Set<Observer<T>> = new Set();

  public subscribe(observer: Observer<T>): Callback {
    this.observers.add(observer);

    return () => {
      this.observers.delete(observer);
    };
  }

  public next(value: T): void {
    this.observers.forEach((observer) => observer.next(value));
  }
}
