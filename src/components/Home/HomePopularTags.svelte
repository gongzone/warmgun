<script lang="ts">
	import type { Tag } from '$lib/types/tag';

	export let tags: Tag[];
</script>

<ul class="flex flex-wrap gap-2">
	{#each tags as tag (tag.name)}
		<li>
			<a href="tag/{tag.slug}" class="btn btn-sm variant-filled text-sm">{tag.name}</a>
		</li>
	{/each}
</ul>
