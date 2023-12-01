import Observer from './Observer';

describe('Observer', () => {
  describe('next', () => {
    it('should call the callback with the value', () => {
      const callback = jest.fn();
      const observer = new Observer(callback);

      observer.next('value');

      expect(callback).toHaveBeenCalledWith('value');
    });
  });
});
