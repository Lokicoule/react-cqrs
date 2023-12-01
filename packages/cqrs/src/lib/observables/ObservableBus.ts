import { Callback } from '../types';
import { Observer, Subject } from '.';

export default abstract class ObservableBus<T = unknown> {
  private readonly publisher = new Subject<T>();

  public subscribe(observer: Observer<T>): Callback {
    const subscription = this.publisher.subscribe(observer);

    return subscription;
  }

  public publish(command: T): void {
    this.publisher.next(command);
  }
}
