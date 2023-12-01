import CommandContract from './CommandContract';
import CommandHandlerContract, {
  isCommandHandlerContract,
} from './CommandHandlerContract';

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
