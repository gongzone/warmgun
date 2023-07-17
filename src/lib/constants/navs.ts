import type { ComponentType } from 'svelte';

import HomeIcon from '$components/@icons/HomeIcon.svelte';
import ArticleIcon from '$components/@icons/ArticleIcon.svelte';

export interface Nav {
	title: string;
	href: string;
	icon?: ComponentType;
	enum?: string;
}

export const navs = {
	mainNav: [
		{
			title: 'Home',
			href: '/',
			icon: HomeIcon
		},
		{
			title: '아티클',
			href: '/articles',
			icon: ArticleIcon
		},
		{
			title: '커뮤니티',
			href: '/commuties',
			icon: ArticleIcon
		}
	] satisfies Nav[]
};
