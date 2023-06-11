import HomeIcon from '$components/@icons/HomeIcon.svelte';
import GithubIcon from '$components/@icons/GithubIcon.svelte';
import InstagramIcon from '$components/@icons/InstagramIcon.svelte';
import FacebookIcon from '$components/@icons/FacebookIcon.svelte';
import TwitterIcon from '$components/@icons/TwitterIcon.svelte';
import YoutubeIcon from '$components/@icons/YoutubeIcon.svelte';

export const socials = {
	website: {
		title: '웹사이트',
		icon: HomeIcon
	},
	github: {
		title: '깃허브',
		icon: GithubIcon
	},
	instagram: {
		title: '인스타그램',
		icon: InstagramIcon
	},
	facebook: {
		title: '페이스북',
		icon: FacebookIcon
	},
	twitter: {
		title: '트위터',
		icon: TwitterIcon
	},
	youtube: {
		title: '유튜브',
		icon: YoutubeIcon
	}
};
