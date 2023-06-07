import type { NavItem } from '$lib/types/nav';

import HomeIcon from '$components/@icons/HomeIcon.svelte';
import ArticleIcon from '$components/@icons/ArticleIcon.svelte';

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
		}
	] satisfies NavItem[]
};
