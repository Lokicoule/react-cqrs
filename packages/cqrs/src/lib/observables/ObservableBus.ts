import { Observer } from './Observer';
import Subject from './Subject';
import Subscription from './Subscription';

export type ObservableBusOptions = {
  throwError: boolean;
};

export default abstract class ObservableBus<T = unknown> {
  private readonly publisher = new Subject<T>();

  constructor(private options: ObservableBusOptions = { throwError: true }) {}

  public subscribe(observer: Observer<T>): Subscription {
    return this.publisher.subscribe(observer);
  }

  public publish<TResult>(command: T): TResult | undefined {
    try {
      const result = this.execute<TResult>(command);
      this.publisher.next(command);

      return result;
    } catch (error) {
      if (error instanceof Error) this.publisher.error(error);
      if (this.options.throwError) throw error;
    } finally {
      this.publisher.complete();
    }

    return undefined;
  }

  protected abstract execute<TResult>(command: T): TResult;
}
