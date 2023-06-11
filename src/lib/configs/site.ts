import type { NavItem } from '$lib/types/nav';

import HomeIcon from '$components/@icons/HomeIcon.svelte';
import ArticleIcon from '$components/@icons/ArticleIcon.svelte';
import GenreIcon from '$components/@icons/GenreIcon.svelte';
import GithubIcon from '$components/@icons/GithubIcon.svelte';
import InstagramIcon from '$components/@icons/InstagramIcon.svelte';
import FacebookIcon from '$components/@icons/FacebookIcon.svelte';
import TwitterIcon from '$components/@icons/TwitterIcon.svelte';
import YoutubeIcon from '$components/@icons/YoutubeIcon.svelte';
import type { SvelteComponent } from 'svelte';

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
	] satisfies NavItem[],
	socials: [
		{ title: '웹사이트', enum: 'website', icon: HomeIcon },
		{ title: '깃허브', enum: 'github', icon: GithubIcon },
		{ title: '인스타그램', enum: 'instagram', icon: InstagramIcon },
		{ title: '페이스북', enum: 'facebook', icon: FacebookIcon },
		{ title: '트위터', enum: 'twitter', icon: TwitterIcon },
		{ title: '유튜브', enum: 'youtube', icon: YoutubeIcon }
	] satisfies {
		title: string;
		enum: 'website' | 'github' | 'instagram' | 'facebook' | 'twitter' | 'youtube';
		icon: typeof SvelteComponent;
	}[]
};
