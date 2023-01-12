<script lang="ts">
	import type { LayoutData } from './$types';
	import { Avatar } from '@skeletonlabs/skeleton';

	import user from '../../../assets/svg/user.svg';
	import DefaultAvatar from '$components/@svg/default-avatar.svelte';
	import { allAvatars } from '$lib/character/avatar';
	import { allClasses } from '$lib/character/class';

	export let data: LayoutData;

	$: avatarUrl = allAvatars[data.blogUser.mainAvatar].url;
	$: username = data.blogUser.name;
	$: userLevel = data.blogUser.level;
	$: userClass = allClasses[data.blogUser.class].name;
</script>

<div class="pb-6"><h2>BlogName</h2></div>

<div class="card flex items-center p-4">
	<Avatar class="w-20 h-20 ml-3" src={avatarUrl} />
	<span class="divider-vertical h-20 mx-6" />
	<ul class="flex flex-col gap-2">
		<li class="flex items-center gap-2">
			<span class="text-sm font-bold">레벨</span>
			<span class="text-lg font-bold">{userLevel}</span>
		</li>
		<li class="flex items-center gap-2">
			<span class="text-sm font-bold">이름</span>
			<span class="text-lg font-bold">{username}</span>
		</li>
		<li class="flex items-center gap-2">
			<span class="text-sm font-bold">직업</span>
			<span class="text-lg font-bold">{userClass}</span>
		</li>
	</ul>
</div>
