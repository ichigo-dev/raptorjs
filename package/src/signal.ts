import { Subscriber } from './types';

export interface Signal<T>
{
	value?: T,
	subscribers: Subscriber[],
}
