<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';

	import { TOTAL_TAGS_NUMBER } from '$lib/constants/tag';
	import { getPopularTags } from '$api/tag';

	const getPopularTagsQuery = createQuery({
		queryKey: ['popularTags', TOTAL_TAGS_NUMBER],
		queryFn: () => getPopularTags(TOTAL_TAGS_NUMBER)
	});

	$: tags = $getPopularTagsQuery.isSuccess ? $getPopularTagsQuery.data : [];
</script>

<ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
	{#each tags as tag, index (tag.name)}
		<li class={`${index > 7 ? 'hidden sm:inline-flex' : ''}`}>
			<!-- Todo: link 넣기 -->
			<a href={`/`} class="w-full btn btn-lg variant-ringed-tertiary rounded-lg text-sm">
				<span class="max-w-[78px] truncate">#{tag.name}</span>
			</a>
		</li>
	{/each}
</ul>
