export type Subscriber = () => void;
export type Getter<T> = () => T;
export type Setter<T> = ( value: T ) => void;
export type Subscribe = ( subscribe: Subscriber ) => void;
export type Equals<T> = ( a: T, b: T ) => boolean;
export type Context = Subscriber;
