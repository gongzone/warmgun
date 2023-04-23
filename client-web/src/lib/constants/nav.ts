import HomeIcon from '~icons/ri/home-3-line';
import NowIcon from '~icons/ri/timer-flash-line';
import HashTagIcon from '~icons/ri/hashtag';
import CommunityIcon from '~icons/ri/community-line';
import QuillPenIcon from '~icons/ri/quill-pen-line';
import AccountIcon from '~icons/ri/account-pin-circle-line';
import FeedIcon from '~icons/ri/rss-fill';

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

export const authenticatedLinks = (username: string, latestDraftId: number) => [
	{ name: '내 블로그', to: `/@${username}`, icon: CommunityIcon },
	{ name: '글쓰기', to: `/write/draft/${latestDraftId}`, icon: QuillPenIcon },
	{ name: '나의 피드', to: '/feed', icon: FeedIcon },
	{ name: '프로필 설정', to: '/me/profile', icon: AccountIcon }
];

export interface NavLink {
	name: string;
	icon?: any;
	to: string;
}
