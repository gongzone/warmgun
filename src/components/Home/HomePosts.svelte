<script lang="ts">
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import type { Post } from '$lib/types/post';
	import NoDataCard from '$components/@ui/NoDataCard.svelte';
	import type { ComponentType } from 'svelte';
	import PostItem from '$components/@item/Post/PostItem.svelte';

	export let title: string;
	export let link: string;
	export let icon: ComponentType;
	export let posts: Post[];
</script>

<div>
	<div class="flex items-center justify-between">
		<a href={link}>
			<TextWithIcon size="lg" textClasses="font-semibold" {icon}>{title}</TextWithIcon>
		</a>
	</div>
	<ul>
		{#if posts.length > 0}
			{#each posts as post (post.id)}
				{@const { user, title } = post}
				<li>
					<PostItem
						displayUserInfo={true}
						displayCommunity={false}
						displayCount={true}
						{post}
						py="py-3 sm:py-4"
					/>
				</li>
			{/each}
		{:else}
			<NoDataCard />
		{/if}
	</ul>
</div>
