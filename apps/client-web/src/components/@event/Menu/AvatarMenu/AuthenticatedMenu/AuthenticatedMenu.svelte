<script lang="ts">
	import { goto } from '$app/navigation';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';

	import type { User } from '$lib/types/api';
	import { logout } from '$api/auth';
	import { authenticatedLinks } from '$lib/constants/nav';

	import NavLink from '$components/@ui/Link/NavLink.svelte';
	import UserAvatar from '$components/@ui/Element/UserAvatar.svelte';

	export let user: User;
	export let latestDraftId: number;

	const menuKey = 'authenticated-menu';
	const settings: PopupSettings = {
		event: 'click',
		target: menuKey
	};

	const queryClient = useQueryClient();

	const logoutMutation = createMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.setQueryData(['users', 'me'], null);
			queryClient.setQueryData(['drafts', 'me'], null);
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
				{#each authenticatedLinks(user.username, latestDraftId) as link (link.to)}
					<li>
						<NavLink {link} badge={true} />
					</li>
				{/each}

				<li>
					<button class="w-full option" on:click={() => $logoutMutation.mutate()}>로그아웃</button>
				</li>
			</ul>
		</nav>
	</div>
</div>
