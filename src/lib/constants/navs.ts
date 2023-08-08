import type { ComponentType } from 'svelte';

import { CommonIcons } from '$components/@icons/common';

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
			icon: CommonIcons.Home
		},
		{
			title: '아티클',
			href: '/article',
			icon: CommonIcons.Article
		},
		{
			title: '커뮤니티',
			href: '/community',
			icon: CommonIcons.Community
		}
	] satisfies Nav[],
	userNav: (username: string) =>
		[
			{ title: '내 블로그', href: `/@${username}`, icon: CommonIcons.Blog },
			{ title: '글쓰기', href: `/write`, icon: CommonIcons.Draft },
			{ title: '나의 피드', href: '/feed', icon: CommonIcons.Feed },
			{ title: '설정', href: '/setting', icon: CommonIcons.Setting }
		] satisfies Nav[],
	community: [
		{ title: '전체', href: '/community' },
		{ title: '자유', href: '/community/free' },
		{ title: '질문', href: '/community/question' },
		{ title: '토론', href: '/community/discussion' },
		{ title: '팀원', href: '/community/team' }
	] satisfies Nav[]
};
