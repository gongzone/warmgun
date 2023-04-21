<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import CommunityIcon from '~icons/ri/community-line';
	import QuillPenIcon from '~icons/ri/quill-pen-line';
	import AccountIcon from '~icons/ri/account-pin-circle-line';
	import FeedIcon from '~icons/ri/rss-fill';

	import type { User } from '$lib/types/api';
	import { logout } from '$api/auth';

	import UserAvatar from '$components/@ui/Block/UserAvatar.svelte';

	export let user: User;
	export let latestDraftId: number;

	const menuKey = 'authenticated-menu';
	const settings: PopupSettings = {
		event: 'click',
		target: menuKey
	};

	const navData = [
		{ name: '내 블로그', to: `/@${user.username}`, icon: CommunityIcon },
		{ name: '글쓰기', to: `/write/draft/${latestDraftId}`, icon: QuillPenIcon },
		{ name: '나의 피드', to: '/feed', icon: FeedIcon },
		{ name: '프로필 설정', to: '/me/profile', icon: AccountIcon }
	];

	const queryClient = useQueryClient();

	const logoutMutation = createMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.setQueryData(['me'], null);
			queryClient.setQueryData(['myDrafts'], null);
			goto('/auth/login');
		}
	});
</script>

<div>
	<button class="btn-icon md:btn-icon-lg" use:popup={settings}>
		<span><UserAvatar avatar={user.profile.avatar} width="w-12 md:w-[53px]" /></span>
	</button>

	<div class="relative card w-52 p-4 shadow-xl z-50" data-popup={menuKey}>
		<nav class="list-nav">
			<ul>
				{#each navData as nav (nav.to)}
					<li>
						<a href={nav.to}>
							<span class="badge-icon py-4">
								<svelte:component this={nav.icon} class="w-[24px] h-[24px]" />
							</span>
							<span class="flex-auto">{nav.name}</span>
						</a>
					</li>
				{/each}

				<li>
					<button class="w-full option" on:click={() => $logoutMutation.mutate()}>로그아웃</button>
				</li>
			</ul>
		</nav>
	</div>
</div>
