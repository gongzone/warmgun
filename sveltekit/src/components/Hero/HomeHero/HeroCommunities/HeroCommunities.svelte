<script lang="ts">
	import { communities } from '$lib/constants/navigation';
</script>

<ul class="flex flex-wrap gap-2">
	{#each communities as community (community.name)}
		<li>
			<a href={community.to} class="btn btn-sm variant-ringed-surface font-logo py-3 md:btn-lg"
				>{community.name}</a
			>
		</li>
	{/each}
</ul>
