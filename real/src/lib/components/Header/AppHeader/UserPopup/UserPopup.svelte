<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	import UserAvatar from '$lib/components/@ui/UserAvatar.svelte';
	import BlogIcon from '$lib/components/@icons/BlogIcon.svelte';
	import DraftIcon from '$lib/components/@icons/DraftIcon.svelte';
	import FeedIcon from '$lib/components/@icons/FeedIcon.svelte';
	import SettingIcon from '$lib/components/@icons/SettingIcon.svelte';
	import NavItem from '$lib/components/@ui/NavItem.svelte';

	const popupKey = 'user-popup';
	const userPopup: PopupSettings = {
		event: 'click',
		target: popupKey,
		placement: 'bottom'
	};

	$: userNav = [
		{ title: '내 블로그', href: `/@${$page.data.user?.username}`, icon: BlogIcon },
		{ title: '글쓰기', href: `/write/draft`, icon: DraftIcon },
		{ title: '나의 피드', href: '/feed', icon: FeedIcon },
		{ title: '설정', href: '/me/profile', icon: SettingIcon }
	];
</script>

{#if !$page.data.user}
	<a href="/auth/login" class="btn btn-sm variant-filled md:btn">로그인</a>
{:else}
	<button use:popup={userPopup}>
		<UserAvatar src={$page.data.user.profile?.avatar} />
	</button>

	<div class="relative card w-52 p-4 shadow-xl" data-popup={popupKey}>
		<nav class="list-nav">
			<ul>
				{#each userNav as nav (nav.title)}
					<li>
						<NavItem title={nav.title} href={nav.href} icon={nav.icon} />
					</li>
				{/each}
			</ul>

			<hr class="my-2" />

			<ul>
				<li>
					<form method="POST" action="/auth/logout" use:enhance>
						<button type="submit" class="w-full">로그아웃</button>
					</form>
				</li>
			</ul>
		</nav>
	</div>
{/if}
