import { Provider } from '../../shared/types';

export type RegistryEntry<T = unknown> = {
  provider: Provider<T>;
  instance?: T;
};
