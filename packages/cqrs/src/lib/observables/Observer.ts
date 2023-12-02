export type Observer<T> = {
  next: (value: T) => void;
  error?: (error: Error) => void;
  complete?: () => void;
};
