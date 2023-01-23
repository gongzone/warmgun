<script lang="ts">
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';

	import type { CurrentUser } from '$lib/types/current-user';
	import { allAvatars } from '$lib/character/avatar';
	import { drawerClose } from '$components/Drawer/Drawer';

	let user: CurrentUser;

	$: user = $page.data.user;
	$: avatarSrc = user && user.character ? allAvatars[user.character.mainAvatar].url : '';
</script>

<div class="flex justify-end p-5">
	<button class="btn-icon btn-ringed-tertiary" on:click={drawerClose}>
		<i class="ri-close-line ri-xl" />
	</button>
</div>

<div class="px-8">
	<div class="flex flex-col justify-center items-center gap-3">
		<div class="relative inline-block">
			<span class="badge badge-filled-primary absolute -top-1 -right-1 z-10"
				>Lv {user?.character?.level}</span
			>

			<Avatar width="w-24" src={avatarSrc} />
		</div>
		<div class="">
			<span class="text-lg font-bold">{user?.character?.name}</span>
		</div>
	</div>
</div>

<div class="px-8" />
