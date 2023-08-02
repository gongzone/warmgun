<script lang="ts">
	import type { LayoutData } from './$types';
	import Image from '$components/@ui/Image.svelte';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import Separator from '$components/@ui/Separator.svelte';

	export let data: LayoutData;

	$: ({ blogUser } = data);

	$: console.log(blogUser);
</script>

<div class="max-w-[728px] mx-auto">
	<div class="relative w-full h-[200px]">
		{#if blogUser.profile?.blogImage}
			<Image src={blogUser.profile.blogImage} alt="blog-cover" />
		{:else}
			<div class="w-full h-full bg-surface-800" />
		{/if}
		<div class="flex items-center justify-center">
			<div class="absolute flex left-6 bottom-0 translate-y-1/2">
				<UserAvatar
					src={blogUser.profile?.avatar}
					width="w-32"
					border="border-4 border-surface-900-50-token"
				/>
				<div class="flex items-center self-end gap-2 ml-1 mb-1">
					<span class="text-2xl font-semibold">{blogUser.profile?.nickname}</span>
					<span>·</span>
					<span class="badge variant-filled">{blogUser.profile?.field}</span>
				</div>
			</div>
		</div>
	</div>

	<div class="h-[82px]" />

	<div class="flex gap-8">
		<div class="max-w-[400px] mx-auto">
			<p class="font-light">{blogUser.profile?.bio}</p>
		</div>
	</div>

	<slot />
</div>
