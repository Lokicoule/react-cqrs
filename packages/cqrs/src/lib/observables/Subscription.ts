export default class Subscription {
  private isClosed = false;

  constructor(private onUnsubscribe: () => void) {}

  public unsubscribe() {
    if (!this.isClosed) {
      this.onUnsubscribe();
      this.isClosed = true;
    }
  }
}
