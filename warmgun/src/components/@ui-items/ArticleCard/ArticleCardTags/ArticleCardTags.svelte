<script lang="ts">
	export let tags: {
		name: string;
	}[];
</script>

<ul class="flex items-center gap-2 px-4 overflow-x-clip">
	{#each tags.slice(0, 2) as tag (tag.name)}
		<li>
			<a href={'/'} class="unstyled">
				<span class="block max-w-[108px] chip variant-ghost-surface truncate">{tag.name}</span>
			</a>
		</li>
	{/each}
</ul>
