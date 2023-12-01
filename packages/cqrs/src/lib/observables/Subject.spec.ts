import Observer from './Observer';
import Subject from './Subject';

describe('Subject', () => {
  describe('subscribe', () => {
    it('should return a function', () => {
      const subject = new Subject();

      const subscription = subject.subscribe(new Observer(() => {}));

      expect(subscription).toBeDefined();
      expect(typeof subscription).toBe('function');
    });

    it('should add the observer to the observers set', () => {
      const subject = new Subject();
      const observer = new Observer(() => {});

      subject.subscribe(observer);

      expect(subject['observers'].has(observer)).toBe(true);
    });

    it('should return a function that removes the observer from the observers set', () => {
      const subject = new Subject();
      const observer = new Observer(() => {});

      const unsubscription = subject.subscribe(observer);

      unsubscription();

      expect(subject['observers'].has(observer)).toBe(false);
    });
  });

  describe('next', () => {
    it('should be defined', () => {
      const subject = new Subject();

      expect(subject.next).toBeDefined();
    });

    it('should call the next method on each observer', () => {
      const subject = new Subject();
      const observer1 = new Observer(() => {});
      const observer2 = new Observer(() => {});
      const observer3 = new Observer(() => {});
      const spy1 = jest.spyOn(observer1, 'next');
      const spy2 = jest.spyOn(observer2, 'next');
      const spy3 = jest.spyOn(observer3, 'next');

      subject.subscribe(observer1);
      subject.subscribe(observer2);
      subject.subscribe(observer3);

      subject.next('test');

      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy1).toHaveBeenCalledWith('test');
      expect(spy2).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledWith('test');
      expect(spy3).toHaveBeenCalledTimes(1);
      expect(spy3).toHaveBeenCalledWith('test');
    });
  });
});
