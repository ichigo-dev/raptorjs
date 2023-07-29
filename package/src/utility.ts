export class Stack<T> extends Array<T>
{
	top(): T | undefined
	{
		return this.at(-1);
	}
}
