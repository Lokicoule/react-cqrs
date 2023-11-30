export type constructor<T> = {
  new (...args: any[]): T;
};

export type Provider<T = unknown> = ClassProvider<T> | ValueProvider<T>;

export type ClassProvider<T = unknown> = {
  useClass: constructor<T>;
};

export type ValueProvider<T = unknown> = {
  useValue: T;
};
