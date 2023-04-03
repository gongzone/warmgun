<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import CommunityIcon from '~icons/ri/community-line';
	import QuillPenIcon from '~icons/ri/quill-pen-line';

	import { logout } from '$api/auth';
	import type { GetMeResult } from '$api/me';
	import UserAvatar from '$components/@Base/Avatar/UserAvatar.svelte';

	export let user: GetMeResult;
	export let latestDraftId: number;

	const menuKey = 'authenticated-menu';
	const settings: PopupSettings = {
		event: 'click',
		target: menuKey
	};

	const navData = [
		{ name: '내 블로그', to: `/@${user.username}`, icon: CommunityIcon },
		{ name: '글쓰기', to: `/write/draft/${latestDraftId}`, icon: QuillPenIcon }
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
	<button use:popup={settings} class="btn-icon md:btn-icon-lg px-0">
		<UserAvatar avatar={user.profile.avatar} width="md:w-[53px]" />
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
