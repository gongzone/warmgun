<script lang="ts">
	import TagChip from '$components/@ui/Block/TagChip.svelte';

	export let tags: {
		name: string;
	}[];
</script>

<footer class="flex items-center justify-between md:pl-14">
	<ul class="flex items-center gap-2 overflow-x-clip">
		{#each tags.slice(0, 3) as tag (tag.name)}
			<li>
				<TagChip name={tag.name} />
			</li>
		{/each}
	</ul>
</footer>
