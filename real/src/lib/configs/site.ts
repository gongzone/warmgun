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
			enum: 'FRONTEND',
			href: '/genre/frontend'
		},
		{
			title: '백엔드',
			enum: 'BACKEND',
			href: '/genre/backend'
		},
		{
			title: '데브옵스',
			enum: 'DEVOPS',
			href: '/genre/devops'
		},
		{
			title: '모바일',
			enum: 'MOBILE',
			href: '/genre/mobile'
		},
		{
			title: '데이터 사이언스',
			enum: 'DATA_SCIENCE',
			href: '/genre/data-science'
		},
		{
			title: '게임',
			enum: 'GAME',
			href: '/genre/game'
		},
		{
			title: '기타',
			enum: 'ETC',
			href: '/genre/etc'
		}
	]
};
