import CommandContract from './CommandContract';
import CommandHandlerContract, {
  CommandHandlerFn,
  isCommandHandler,
  isCommandHandlerContract,
  isCommandHandlerFn,
} from './CommandHandlerContract';

describe('isCommandHandlerContract', () => {
  describe('isCommandHandlerContract', () => {
    it('should return true if handler is CommandHandlerContract', () => {
      const handler = new (class
        implements CommandHandlerContract<CommandContract>
      {
        execute(): void {}
      })();

      expect(isCommandHandlerContract(handler)).toBeTruthy();
    });

    it('should return false if handler is not CommandHandlerContract', () => {
      const handler = {} as CommandHandlerContract<CommandContract>;

      expect(isCommandHandlerContract(handler)).toBeFalsy();
    });
  });

  describe('isCommandHandlerFn', () => {
    it('should return true if handler is CommandHandlerFn', () => {
      const handler = () => {};

      expect(isCommandHandlerFn(handler)).toBeTruthy();
    });

    it('should return false if handler is not CommandHandlerFn', () => {
      const handler = {} as CommandHandlerFn<CommandContract>;

      expect(isCommandHandlerFn(handler)).toBeFalsy();
    });
  });

  describe('isCommandHandler', () => {
    it('should return true if handler is CommandHandlerFn', () => {
      const handler = () => {};

      expect(isCommandHandler(handler)).toBeTruthy();
    });

    it('should return true if handler is CommandHandlerContract', () => {
      const handler = new (class
        implements CommandHandlerContract<CommandContract>
      {
        execute(): void {}
      })();

      expect(isCommandHandler(handler)).toBeTruthy();
    });

    it('should return false if handler is not CommandHandlerFn or CommandHandlerContract', () => {
      const handler = {} as CommandHandlerFn<CommandContract>;

      expect(isCommandHandler(handler)).toBeFalsy();
    });
  });
});
