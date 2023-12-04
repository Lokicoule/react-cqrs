import { Provider } from '../../shared/types';

export type RegistryEntry<T = unknown> = {
  provider: Provider<T>;
  instance?: T;
};

export function isInstance<T>(instance: unknown): instance is T {
  return typeof instance === 'object' && instance !== null;
}

export function isRegistryEntry<T>(entry: unknown): entry is RegistryEntry<T> {
  return isInstance<RegistryEntry<T>>(entry) && 'provider' in entry;
}
