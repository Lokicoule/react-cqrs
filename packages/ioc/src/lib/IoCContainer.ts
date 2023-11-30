import { IocContainerContract } from './contracts';
import { DependencyNotFoundException } from './exceptions/DependencyNotFoundException';

export class IocContainer implements IocContainerContract {
  private dependencies: Map<string, unknown> = new Map();

  public register<T>(identifier: string, instance: T): void {
    this.dependencies.set(identifier, instance);
  }

  public resolve<T>(identifier: string): T {
    const dependency = this.dependencies.get(identifier);

    if (!dependency) {
      throw new DependencyNotFoundException(identifier);
    }

    return dependency as T;
  }
}
