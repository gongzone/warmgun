<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import PostItem from '$components/Community/PostItem.svelte';

	import CommunitySortor from '$components/Community/CommunitySortor.svelte';
	import CommunityPaginator from '$components/Community/CommunityPaginator.svelte';
	import CommunityTab from '$components/Community/CommunityTab.svelte';

	export let data: PageData;

	$: ({ posts, postsCount } = data);
	$: c = $page.url.searchParams.get('cursor');
	$: s = $page.url.searchParams.get('sort');

	$: cursor = c ? +c : null;
	$: sort = s ? s : null;
</script>

<div class="container max-w-[800px] mx-auto py-16 md:py-20">
	<div class="space-y-6">
		<h3 class="text-7xl font-bold text-center">Community</h3>
		<div class="flex items-center justify-between">
			<CommunitySortor {cursor} />
			<a href="/community/write" class="btn variant-ringed-tertiary">게시글 작성</a>
		</div>
		<CommunityTab {sort} />
	</div>

	<ul>
		{#each posts as post (post.id)}
			<li>
				<PostItem {post} />
			</li>
		{/each}
	</ul>

	<div class="my-12">
		<CommunityPaginator {cursor} count={postsCount} />
	</div>
</div>
