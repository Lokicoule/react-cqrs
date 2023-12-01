export default class Observer<T> {
  constructor(private readonly callback: (value: T) => void) {}

  public next(value: T): void {
    this.callback(value);
  }
}
