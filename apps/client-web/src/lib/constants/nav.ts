import HomeIcon from '~icons/ri/home-3-line';
import NowIcon from '~icons/ri/timer-flash-line';
import HashTagIcon from '~icons/ri/hashtag';

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
		name: '태그',
		icon: HashTagIcon,
		to: '/tags'
	}
];

export const anonymousLinks: NavLink[] = [
	{ name: '로그인', to: '/auth/login' },
	{ name: '회원가입', to: '/auth/signup' }
];

export interface NavLink {
	name: string;
	icon?: any;
	to: string;
}
