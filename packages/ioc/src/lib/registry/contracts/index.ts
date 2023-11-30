import { Provider } from '../../shared/types';
import { RegistryEntry } from '../types';

export interface RegistryContract {
  register<T>(token: string, provider: Provider<T>): void;
  resolve<T>(token: string): T;
  clear(): void;
  getDependencies(): Map<string, RegistryEntry>;
  getDependency<T>(token: string): RegistryEntry<T> | undefined;
}
