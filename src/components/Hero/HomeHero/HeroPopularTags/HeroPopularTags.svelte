<script lang="ts">
	interface PopularTags {
		name: string;
		to: string;
	}

	export let popularTags: PopularTags[];
</script>

<ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
	{#each popularTags as tag, index (tag.name)}
		<li class={`${index > 7 ? 'hidden sm:inline-flex' : ''}`}>
			<a href={tag.to} class="w-full btn btn-lg variant-ringed-tertiary rounded-lg text-sm">
				<span class="max-w-[78px] truncate">#{tag.name}</span>
			</a>
		</li>
	{/each}
</ul>
