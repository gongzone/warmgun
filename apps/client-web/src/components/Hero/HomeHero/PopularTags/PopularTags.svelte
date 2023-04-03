<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';

	import { getPopularTags } from '$api/tag';
	import { TOTAL_TAGS_NUMBER } from '$lib/constants/tag';
	import { formatTagNameToSlug } from '$lib/utils/format';

	const popularTagsQuery = createQuery({
		queryKey: ['popularTags', TOTAL_TAGS_NUMBER],
		queryFn: () => getPopularTags(TOTAL_TAGS_NUMBER)
	});
</script>

<div class="space-y-4 text-center">
	<span class="text-sm font-bold md:text-base">Popular Tags</span>
	{#if $popularTagsQuery.isSuccess}
		<ul class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
			{#each $popularTagsQuery.data as tag, index (tag.name)}
				<li class={`${index > 7 ? 'hidden sm:inline-flex' : ''}`}>
					<a
						href={formatTagNameToSlug(tag.name)}
						class="btn btn-lg variant-ringed-tertiary w-full rounded-lg text-sm"
					>
						<span class="max-w-[78px] truncate">#{tag.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
