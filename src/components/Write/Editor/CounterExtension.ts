import { Node, mergeAttributes } from '@tiptap/core';
import SvelteNodeViewRenderer from './NodeView/SvelteNodeViewRenderer';

import CounterComponent from './Counter.svelte';

export const SvelteCounterExtension = Node.create({
	name: 'SvelteCounterComponent',
	group: 'block',
	atom: true,
	draggable: true,
	inline: false,

	addAttributes() {
		return {
			count: {
				default: 0
			}
		};
	},

	parseHTML() {
		return [{ tag: 'svelte-counter-component' }];
	},

	renderHTML({ HTMLAttributes }) {
		return ['svelte-counter-component', mergeAttributes(HTMLAttributes)];
	},

	addNodeView() {
		return SvelteNodeViewRenderer(CounterComponent);
	}
});
