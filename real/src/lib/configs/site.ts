import HomeIcon from '$lib/components/@icons/HomeIcon.svelte';
import ArticleIcon from '$lib/components/@icons/ArticleIcon.svelte';
import TagIcon from '$lib/components/@icons/TagIcon.svelte';
import GenreIcon from '$lib/components/@icons/GenreIcon.svelte';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'Warmgun',
	description: '개발 커뮤니티 & 블로그 서비스',
	mainNav: [
		{
			title: 'Home',
			href: '/',
			Icon: HomeIcon
		},
		{
			title: '아티클',
			href: '/articles',
			Icon: ArticleIcon
		},
		{
			title: '태그',
			href: '/tags',
			Icon: TagIcon
		},
		{
			title: '장르',
			href: '/genre',
			Icon: GenreIcon
		}
	],
	genre: [
		{
			title: '프론트엔드',
			href: '/genre/frontend'
		},
		{
			title: '백엔드',
			href: '/genre/backend'
		},
		{
			title: '데브옵스',
			href: '/genre/devops'
		},
		{
			title: '모바일',
			href: '/genre/mobile'
		},
		{
			title: 'AI / 데이터 사이언스',
			href: '/genre/data-science'
		},
		{
			title: '게임',
			href: '/genre/game'
		},
		{
			title: '기타',
			href: '/genre/etc'
		}
	]
};
