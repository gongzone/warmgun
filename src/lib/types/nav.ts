import type { ComponentType } from 'svelte';

export interface NavItem {
	title: string;
	href: string;
	icon?: ComponentType;
	enum?: string;
}
