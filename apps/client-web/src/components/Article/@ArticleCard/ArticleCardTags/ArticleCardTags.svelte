<script lang="ts">
	import TagChip from '$components/@ui/Block/TagChip.svelte';

	export let tags: {
		name: string;
	}[];
</script>

<ul class="flex items-center gap-2 px-4 overflow-x-clip">
	{#each tags.slice(0, 2) as tag (tag.name)}
		<li>
			<TagChip name={tag.name} />
		</li>
	{/each}
</ul>
