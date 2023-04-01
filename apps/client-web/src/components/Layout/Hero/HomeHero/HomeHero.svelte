<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';

	import { communities } from '$lib/constants/nav';
	import { TOTAL_TAGS_NUMBER } from '$lib/constants/tag';
	import { getPopularTags } from '$api/tag';
	import { formatTagNameToSlug } from '$lib/utils/format';

	import CommunityLink from './CommunityLink/CommunityLink.svelte';
	import PopularTag from './PopularTag/PopularTag.svelte';
	import HeroSearch from './HeroSearch/HeroSearch.svelte';

	const popularTagsQuery = createQuery({
		queryKey: ['popularTags', TOTAL_TAGS_NUMBER],
		queryFn: () => getPopularTags(TOTAL_TAGS_NUMBER)
	});
</script>

<div class="relative flex flex-col items-center px-4 pb-12">
	<ul class="flex flex-wrap gap-2">
		{#each communities as community (community.name)}
			<li>
				<CommunityLink to={community.to} name={community.name} />
			</li>
		{/each}
	</ul>

	<div class="mt-6 mb-8">
		<div class="flex flex-col items-center gap-1">
			<span class="font-bold font-serif text-2xl">당신의 개발 이야기</span>
			<span class="font-serif">기록하고 공유하세요</span>
		</div>
	</div>

	<div class="space-y-8">
		<HeroSearch />

		<div class="space-y-4 text-center">
			<span class="text-sm md:text-base font-bold">Popular Tags</span>
			{#if $popularTagsQuery.isSuccess}
				<ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
					{#each $popularTagsQuery.data as tag, index (tag.name)}
						<li class={`${index > 7 ? 'hidden sm:inline-flex' : ''}`}>
							<PopularTag to={formatTagNameToSlug(tag.name)} name={tag.name} />
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>
