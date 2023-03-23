<script lang="ts">
	export let tags: {
		name: string;
	}[];
</script>

<ul class="flex flex-wrap items-center gap-2 overflow-x-clip mt-auto px-4 mb-4">
	{#each tags as tag (tag.name)}
		<li>
			<a href={`/`} class="unstyled">
				<span class="block max-w-[108px] chip variant-ghost-surface truncate">{tag.name}</span>
			</a>
		</li>
	{/each}
</ul>
