<script lang="ts">
	import NoDataCard from '$components/@ui/NoDataCard.svelte';
	import type { Tag } from '$lib/types/tag';

	export let tags: Tag[];
</script>

{#if tags.length > 0}
	<ul class="flex flex-wrap gap-2">
		{#each tags as tag (tag.name)}
			<li>
				<a href="tag/{tag.slug}" class="btn btn-sm variant-filled text-sm">{tag.name}</a>
			</li>
		{/each}
	</ul>
{:else}
	<NoDataCard />
{/if}
