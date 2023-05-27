<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	import type { NavItem } from '$lib/types/nav';

	import BlogIcon from '$components/@icons/BlogIcon.svelte';
	import DraftIcon from '$components/@icons/DraftIcon.svelte';
	import FeedIcon from '$components/@icons/FeedIcon.svelte';
	import SettingIcon from '$components/@icons/SettingIcon.svelte';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import Navigation from '$components/@ui/Navigation.svelte';

	const popupKey = 'user-popup';
	const userPopup: PopupSettings = {
		event: 'click',
		target: popupKey,
		placement: 'bottom'
	};

	$: userNav = [
		{ title: '내 블로그', href: `/@${$page.data.user?.username}`, icon: BlogIcon },
		{ title: '글쓰기', href: `/write`, icon: DraftIcon },
		{ title: '나의 피드', href: '/feed', icon: FeedIcon },
		{ title: '설정', href: '/settings', icon: SettingIcon }
	] satisfies NavItem[];
</script>

{#if !$page.data.user}
	<a href="/auth/login" class="btn btn-sm variant-filled md:btn">로그인</a>
{:else}
	<button use:popup={userPopup}>
		<UserAvatar src={$page.data.user.profile?.avatar} />
	</button>

	<div class="card w-52 p-4 shadow-xl z-40" data-popup={popupKey}>
		<Navigation items={userNav}>
			<svelte:fragment slot="subItems">
				<ul>
					{#if $page.data.user.role === 'ADMIN'}
						<li>
							<a href="/admin">관리자 페이지</a>
						</li>
					{/if}
					<li>
						<form method="POST" action="/auth/logout" use:enhance>
							<button type="submit" class="w-full">로그아웃</button>
						</form>
					</li>
				</ul>
			</svelte:fragment>
		</Navigation>
	</div>
{/if}
