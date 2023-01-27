<script lang="ts">
	import type { LayoutData } from './$types';
	import { writable, type Writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { Avatar, TabGroup, Tab } from '@skeletonlabs/skeleton';

	import { allAvatars } from '$lib/character/avatar';
	import { allClasses } from '$lib/character/class';

	export let data: LayoutData;
	const storeTab: Writable<string> = writable(`/${data.slug}`);

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
			<span class="text-sm font-bold">{userLevel}</span>
		</li>
		<li class="flex items-center gap-2">
			<span class="text-sm font-bold">이름</span>
			<span class="text-sm font-bold">{username}</span>
		</li>
		<li class="flex items-center gap-2">
			<span class="text-sm font-bold">직업</span>
			<span class="text-sm font-bold">{userClass}</span>
		</li>
	</ul>
</div>

<div class="px-4 py-8">
	<TabGroup selected={storeTab}>
		<Tab tag="a" value={`/${data.slug}`}>전시관</Tab>
		<Tab tag="a" value={`/${data.slug}/posts`}>글</Tab>
	</TabGroup>
</div>
