export interface IocContainerContract {
  register<T>(identifier: string, instance: T): void;
  resolve<T>(identifier: string): T;
}
