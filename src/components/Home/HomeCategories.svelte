<script lang="ts">
	import { categories } from '$lib/constants/categories';
</script>

<div class="flex flex-wrap gap-2">
	{#each Object.entries(categories) as [categoryEnum, { title, slug }] (title)}
		<a href="/article/{slug}" class="btn btn-sm variant-outline">{title}</a>
	{/each}
</div>
