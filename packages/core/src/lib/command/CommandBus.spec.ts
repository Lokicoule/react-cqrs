import { CommandBus } from './CommandBus';
import { CommandHandlerContract } from './contracts';
import { CommandAlreadyRegisteredException } from './exceptions/CommandAlreadyRegisteredException';
import { CommandNotFoundException } from './exceptions';
import { BaseCommand } from './models/BaseCommand';

const simpleCommand = {
  commandName: 'command:simple',
};

class SimpleCommand extends BaseCommand {
  public static override readonly commandName = 'command:simple';
}

class PayloadCommand extends BaseCommand {
  public static override readonly commandName = 'command:payload';

  constructor(public readonly payload: string) {
    super();
  }
}

class AsyncHandlerForSimpleCommand
  implements CommandHandlerContract<SimpleCommand, Promise<void>>
{
  public async execute(): Promise<void> {
    return Promise.resolve();
  }
}

class AsyncHandlerForPayloadCommand
  implements CommandHandlerContract<PayloadCommand, Promise<string>>
{
  public execute(command: PayloadCommand): Promise<string> {
    return Promise.resolve(command.payload);
  }
}

class SyncHandlerForSimpleCommand
  implements CommandHandlerContract<SimpleCommand, void>
{
  public execute(): void {
    return;
  }
}

class SyncHandlerForPayloadCommand
  implements CommandHandlerContract<PayloadCommand, string>
{
  public execute(command: PayloadCommand): string {
    return command.payload;
  }
}

function payloadCommandHandler(command: PayloadCommand): string {
  return command.payload;
}

describe('CommandBus', () => {
  let commandBus: CommandBus;

  beforeEach(() => {
    commandBus = new CommandBus();
  });

  describe('register', () => {
    it('should register an async handler for a command', () => {
      const unsubscribe = commandBus.register(
        new SimpleCommand(),
        new AsyncHandlerForSimpleCommand()
      );
      expect(unsubscribe).toBeInstanceOf(Function);
    });

    it('should register a sync handler for a command', () => {
      const unsubscribe = commandBus.register(
        new SimpleCommand(),
        new SyncHandlerForSimpleCommand()
      );
      expect(unsubscribe).toBeInstanceOf(Function);
    });

    it('should register a function as a handler for a command', () => {
      const unsubscribe = commandBus.register(
        new PayloadCommand('payload'),
        payloadCommandHandler
      );
      expect(unsubscribe).toBeInstanceOf(Function);
    });

    it('should register an object as a command', () => {
      const unsubscribe = commandBus.register(
        simpleCommand,
        new AsyncHandlerForSimpleCommand()
      );
      expect(unsubscribe).toBeInstanceOf(Function);
    });

    it('should throw CommandAlreadyRegisteredException when a handler is already registered', () => {
      commandBus.register(
        new SimpleCommand(),
        new AsyncHandlerForSimpleCommand()
      );
      expect(() =>
        commandBus.register(
          new SimpleCommand(),
          new AsyncHandlerForSimpleCommand()
        )
      ).toThrow(CommandAlreadyRegisteredException);
    });
  });

  describe('execute', () => {
    it('should execute an async handler for a command', async () => {
      commandBus.register(
        new SimpleCommand(),
        new AsyncHandlerForSimpleCommand()
      );
      await expect(
        commandBus.execute(new SimpleCommand())
      ).resolves.toBeUndefined();
    });

    it('should execute a sync handler for a command', () => {
      commandBus.register(
        new SimpleCommand(),
        new SyncHandlerForSimpleCommand()
      );
      expect(commandBus.execute(new SimpleCommand())).toBeUndefined();
    });

    it('should execute an async handler for a command with payload', async () => {
      commandBus.register(
        new PayloadCommand('payload'),
        new AsyncHandlerForPayloadCommand()
      );
      await expect(
        commandBus.execute(new PayloadCommand('payload'))
      ).resolves.toBe('payload');
    });

    it('should execute a sync handler for a command with payload', () => {
      commandBus.register(
        new PayloadCommand('payload'),
        new SyncHandlerForPayloadCommand()
      );
      expect(commandBus.execute(new PayloadCommand('payload'))).toBe('payload');
    });

    it('should throw CommandNotFoundException when a handler is not registered', () => {
      expect(() =>
        commandBus.execute(new SimpleCommand())
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('unregister', () => {
    it('should unregister a handler', () => {
      const unsubscribe = commandBus.register(
        new SimpleCommand(),
        new AsyncHandlerForSimpleCommand()
      );
      unsubscribe();
      expect(() => commandBus.execute(new SimpleCommand())).toThrow(
        CommandNotFoundException
      );
    });

    it('should not throw when a handler is not registered', () => {
      const unsubscribe = commandBus.register(
        new SimpleCommand(),
        new AsyncHandlerForSimpleCommand()
      );
      unsubscribe();
      expect(() => unsubscribe()).not.toThrow();
    });
  });
});
