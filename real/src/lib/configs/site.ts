import type { NavItem } from '$lib/types/nav';

import HomeIcon from '$components/@icons/HomeIcon.svelte';
import ArticleIcon from '$components/@icons/ArticleIcon.svelte';
import TagIcon from '$components/@icons/TagIcon.svelte';
import GenreIcon from '$components/@icons/GenreIcon.svelte';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'Warmgun',
	description: '개발 커뮤니티 & 블로그 서비스',
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
			title: '장르',
			href: '/genres',
			icon: GenreIcon
		}
	] satisfies NavItem[],
	genre: [
		{
			title: '프론트엔드',
			enum: 'FRONTEND',
			href: '/genres/frontend'
		},
		{
			title: '백엔드',
			enum: 'BACKEND',
			href: '/genres/backend'
		},
		{
			title: '데브옵스',
			enum: 'DEVOPS',
			href: '/genres/devops'
		},
		{
			title: '모바일',
			enum: 'MOBILE',
			href: '/genres/mobile'
		},
		{
			title: '데이터 사이언스',
			enum: 'DATA_SCIENCE',
			href: '/genres/data-science'
		},
		{
			title: '게임',
			enum: 'GAME',
			href: '/genres/game'
		},
		{
			title: '기타',
			enum: 'ETC',
			href: '/genres/etc'
		}
	] satisfies NavItem[]
};
