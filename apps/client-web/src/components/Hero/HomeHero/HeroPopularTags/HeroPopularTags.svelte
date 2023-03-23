<script lang="ts">
	import { getPopularTags } from '$api/tag';
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery({
		queryKey: ['popularTags'],
		queryFn: () => getPopularTags()
	});

	$: console.log($query.data);
</script>

{#if $query.isSuccess}
	<ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
		{#each $query.data as tag, index (tag.name)}
			<li class={`${index > 7 ? 'hidden sm:inline-flex' : ''}`}>
				<a href={`/`} class="w-full btn btn-lg variant-ringed-tertiary rounded-lg text-sm">
					<span class="max-w-[78px] truncate">#{tag.name}</span>
				</a>
			</li>
		{/each}
	</ul>
{/if}
