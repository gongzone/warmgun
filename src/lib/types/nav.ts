import type { SvelteComponent } from 'svelte';

export interface NavItem {
	title: string;
	href: string;
	icon?: typeof SvelteComponent;
	enum?: string;
}
