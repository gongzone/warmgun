<script lang="ts">
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import type { Post } from '$lib/types/post';
	import NoDataCard from '$components/@ui/NoDataCard.svelte';
	import type { ComponentType } from 'svelte';

	export let title: string;
	export let link: string;
	export let icon: ComponentType;
	export let posts: Post[];
</script>

<div>
	<div class="flex items-center justify-between">
		<a href={link}>
			<TextWithIcon size="lg" {icon}>{title}</TextWithIcon>
		</a>
	</div>
	<ul>
		{#if posts.length > 0}
			{#each posts as post (post.id)}
				{@const { user, title } = post}
				<li>
					<div class="py-3 space-y-2 border-b border-b-surface-600">
						<UserAvatar
							name={user.profile?.nickname}
							src="https://github.com/shadcn.png"
							width="w-6"
						/>
						<h2 class="font-semibold line-clamp-1">
							{title}
						</h2>
					</div>
				</li>
			{/each}
		{:else}
			<NoDataCard />
		{/if}
	</ul>
</div>
