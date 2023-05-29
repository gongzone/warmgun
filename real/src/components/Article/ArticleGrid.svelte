<script lang="ts">
	import type { Article } from '$lib/types/article';

	export let items: Article[];
</script>

<ul class="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
	{#each items as item, index (index)}
		<li>
			<slot {item} />
		</li>
	{/each}
</ul>
