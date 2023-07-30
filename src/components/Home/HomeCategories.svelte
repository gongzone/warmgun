<script lang="ts">
	import { categories } from '$lib/constants/categories';
</script>

<div class="flex flex-wrap gap-2">
	{#each Object.entries(categories) as [categoryEnum, { title }] (title)}
		<button class="btn btn-sm variant-outline">{title}</button>
	{/each}
</div>
