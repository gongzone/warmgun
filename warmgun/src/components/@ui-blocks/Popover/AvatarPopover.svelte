<script lang="ts">
	import type { CurrentUser } from '$lib/types/user';
	import { enhance } from '$app/forms';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import CommunityIcon from '~icons/ri/community-line';
	import QuillPenIcon from '~icons/ri/quill-pen-line';
	import AccountIcon from '~icons/ri/account-pin-circle-line';
	import FeedIcon from '~icons/ri/rss-fill';

	import NavLink from '$components/@ui-elements/NavLink.svelte';
	import UserAvatar from '$components/@ui-elements/UserAvatar.svelte';

	export let user: CurrentUser;

	const menuKey = 'authenticated-menu';
	const settings: PopupSettings = {
		event: 'click',
		target: menuKey
	};

	$: links = [
		{ name: '내 블로그', to: `/@${user?.username}`, icon: CommunityIcon },
		{ name: '글쓰기', to: `/write/draft`, icon: QuillPenIcon },
		{ name: '나의 피드', to: '/feed', icon: FeedIcon },
		{ name: '프로필 설정', to: '/me/profile', icon: AccountIcon }
	];
</script>

<div>
	<button class="btn-icon" use:popup={settings}>
		<span><UserAvatar src={user?.profile.avatar} /></span>
	</button>

	<div class="relative card w-52 p-4 shadow-xl z-50" data-popup={menuKey}>
		<nav class="list-nav">
			<ul>
				{#each links as link (link.to)}
					<li>
						<NavLink {link} badge={true} />
					</li>
				{/each}

				<li>
					<form method="POST" action="/auth/logout" use:enhance>
						<button type="submit" class="w-full option">로그아웃</button>
					</form>
				</li>
			</ul>
		</nav>
	</div>
</div>
