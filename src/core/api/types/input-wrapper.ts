export type InputWrapper<T> = {
  [K in keyof T]?: T[K] | any;
} & Record<string, any>;
