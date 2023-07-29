import { Signal } from './signal';
import { Stack } from './utility';
import
{
	Subscriber,
	Getter,
	Setter,
	Subscribe,
	Equals,
	Context,
} from './types';

function default_equals( a: any, b: any ): boolean
{
	return a == b;
}

//	Global context stack.
const g_context = new Stack<Context>();

function getter_of<T>( signal: Signal<T> ): Getter<T>
{
	const getter = function()
	{
		const subscriber = g_context.top();
		if( subscriber )
		{
			signal.subscribers.push(subscriber);
		}
		return signal.value;
	};
	return getter;
}

function setter_of<T>( signal: Signal<T>, equals?: Equals<T> ): Setter<T>
{
	const setter = function( value: T )
	{
		const eq = equals ?? default_equals;
		if( eq(signal.value, value) )
		{
			return;
		}
		signal.value = value;
		for( const subscriber of signal.subscribers )
		{
			subscriber();
		}
	};
	return setter;
}

function create_signal<T>( value: T, equals?: Equals<T> ): [Getter<T>, Setter<T>]
{
	const signal: Signal<T> =
	{
		value,
		subscribers: [],
	};
	return [getter_of(signal), setter_of(signal, equals)];
}

function with_context( context: Context, callback: () => void )
{
	g_context.push(context);
	callback();
	g_context.pop();
}

function create_effect( subscriber: Subscriber ): void
{
	with_context(subscriber, function()
	{
		subscriber();
	});
}

function create_memo( callback: () => T ): Getter<T>
{
	const signal: Signal<T> =
	{
		subscribers: [],
	};

	const context: Context = function()
	{
		const set_value = setter_of(signal);
		set_value(callback());
	};

	with_context(context, function()
	{
		signal.value = callback();
	});
	return getter_of(signal);
}
