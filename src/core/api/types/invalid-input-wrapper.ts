export type InvalidInputWrapper<T> = {
  [K in keyof T]?: T[K] | any;
} & Record<string,any>;
