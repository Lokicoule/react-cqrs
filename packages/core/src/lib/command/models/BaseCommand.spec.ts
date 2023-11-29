import { BaseCommand } from './BaseCommand';

describe('BaseCommand', () => {
  it('should override commandName', () => {
    const command = new (class Test extends BaseCommand {
      public static override readonly commandName = 'command:test';
    })();
    expect(command.commandName).toEqual('command:test');
  });
});
