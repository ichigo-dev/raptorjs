type component_type<P> = ( props: P ) => HTMLElement;

function render<P>
(
	component: component_type<P>,
	props: P,
	container: HTMLElement,
): void
{
	const new_element = component(props);
	container.replaceWith(new_element);
}

function test_component( props: { count: number } ): HTMLElement
{
	const element = document.createElement('div');
	element.innerText = `Count: ${props.count}`;
	return element;
}

const container = document.getElementById('app')!;
render(test_component, { count: 0 }, container);
