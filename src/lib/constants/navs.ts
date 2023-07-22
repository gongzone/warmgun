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
			href: '/community',
			icon: ArticleIcon
		}
	] satisfies Nav[],
	community: [
		{ title: '전체', href: '/community' },
		{ title: '자유', href: '/community/free' },
		{ title: '질문', href: '/community/question' },
		{ title: '토론', href: '/community/discussion' },
		{ title: '팀원', href: '/community/team' }
	] satisfies Nav[]
};
