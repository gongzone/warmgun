<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	import { navs } from '$lib/constants/navs';
	import { classesActive } from '$lib/utils/utils';

	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import Separator from '$components/@ui/Separator.svelte';

	const popupKey = 'user-popup';
	const userPopup: PopupSettings = {
		event: 'click',
		target: popupKey,
		placement: 'bottom'
	};

	$: user = $page.data.user;
</script>

{#if !user}
	<a href="/auth/login" class="btn btn-sm variant-filled md:btn">로그인</a>
{:else}
	<button use:popup={userPopup}>
		<UserAvatar src={user.profile?.avatar} />
	</button>

	<div class="card w-52 p-4 shadow-xl z-40" data-popup={popupKey}>
		<nav class="list-nav">
			<ul>
				{#each navs.userNav(user.username) as nav (nav.title)}
					<li>
						<a
							href={nav.href}
							class={classesActive($page.url.pathname, nav.href, '!bg-surface-300-600-token')}
						>
							<span class="badge-icon">
								<svelte:component this={nav.icon} class="w-5 h-5" />
							</span>
							<span>{nav.title}</span>
						</a>
					</li>
				{/each}
			</ul>

			<Separator class="my-1" />

			<ul class="list-nav">
				{#if user.role === 'ADMIN'}
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
		</nav>
	</div>
{/if}
