export type ObserverNextProps<TParam, TValue> = {
  value: TValue;
  param?: TParam;
};

export type ObserverCompleteProps<TParam> = {
  param?: TParam;
};

export type ObserverErrorProps<TParam> = {
  error: Error;
  param?: TParam;
};

export type Observer<T> = {
  next?: <TValue>(props: ObserverNextProps<T, TValue>) => void;
  error?: (props: ObserverErrorProps<T>) => void;
  complete?: (props?: ObserverCompleteProps<T>) => void;
};
