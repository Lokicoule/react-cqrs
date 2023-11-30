import { Provider } from '../shared/types';
import { RegistryContract } from './contracts';
import { DependencyNotFoundException } from './exceptions/DependencyNotFoundException';
import { RegistryEntry } from './types';

export class Registry implements RegistryContract {
  private dependencies: Map<string, RegistryEntry> = new Map();

  public register<T>(token: string, provider: Provider<T>): void {
    const instance = this.createInstance(provider);
    this.dependencies.set(token, { provider, instance });
  }

  public resolve<T>(token: string): T {
    const entry = this.dependencies.get(token);

    if (!entry) {
      throw new DependencyNotFoundException(token);
    }

    return entry.instance as T;
  }

  public clear(): void {
    this.dependencies.clear();
  }

  public getDependencies(): Map<string, RegistryEntry> {
    return this.dependencies;
  }

  public getDependency<T>(token: string): RegistryEntry<T> | undefined {
    const dependency = this.dependencies.get(token);

    if (!dependency) {
      return undefined;
    }

    return dependency as RegistryEntry<T>;
  }

  private createInstance<T>(provider: Provider<T>): T {
    if ('useClass' in provider) {
      return new provider.useClass();
    }

    return provider.useValue;
  }
}
