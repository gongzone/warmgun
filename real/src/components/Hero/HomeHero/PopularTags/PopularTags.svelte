<script lang="ts">
	import type { Tag } from '$lib/types/tag';

	export let popularTags: Tag[];
</script>

<ul class="flex flex-wrap gap-2">
	{#each popularTags as tag (tag.name)}
		<li>
			<a href="/{tag.slug}" class="btn variant-ringed-tertiary text-sm">{tag.name}</a>
		</li>
	{/each}
</ul>
