import HomeIcon from '~icons/ri/home-3-line';
import NowIcon from '~icons/ri/timer-flash-line';
import FeedIcon from '~icons/ri/rss-line';

export const defaultLinks: NavLink[] = [
	{
		name: '메인 페이지',
		icon: HomeIcon,
		to: '/'
	},
	{
		name: '실시간',
		icon: NowIcon,
		to: '/now'
	},
	{
		name: '나의 피드',
		icon: FeedIcon,
		to: '/articles'
	}
];

export const communities: NavLink[] = [
	{
		name: 'Frontend',
		to: '/community/frontend'
	},
	{
		name: 'Backend',
		to: '/community/backend'
	},
	{
		name: 'Dev-Ops',
		to: '/community/dev-ops'
	},
	{
		name: 'Mobile',
		to: '/community/mobile'
	},
	{
		name: 'Game',
		to: '/community/game'
	},
	{
		name: 'Data Science',
		to: '/community/data-science'
	}
];

export interface NavLink {
	name: string;
	icon?: any;
	to: string;
}
