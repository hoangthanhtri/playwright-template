// Allow structured typing + unexpected/malformed input
export type TestInput<T> = {
  [K in keyof T]?: T[K] | any;
} & Record<string, any>;