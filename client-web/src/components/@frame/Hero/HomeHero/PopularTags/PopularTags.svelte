<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';

	import { findPopularTags } from '$api/tag';
	import { formatTagNameToSlug } from '$lib/utils/format';

	const popularTagsQuery = createQuery({
		queryKey: ['popularTags'],
		queryFn: findPopularTags
	});
</script>

<div class="space-y-4">
	<div class="text-sm font-bold text-center md:text-base">Popular Tags</div>

	{#if $popularTagsQuery.isSuccess}
		<ul class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
			{#each $popularTagsQuery.data as tag, index (tag.name)}
				<li class={index > 7 ? 'hidden sm:inline-flex' : ''}>
					<a
						href={formatTagNameToSlug(tag.name)}
						class="btn btn-lg variant-ringed-tertiary w-full rounded-lg"
					>
						<span class="max-w-[78px] truncate text-sm">#{tag.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
