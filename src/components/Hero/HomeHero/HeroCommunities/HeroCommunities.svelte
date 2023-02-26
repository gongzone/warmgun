<script lang="ts">
	import { communities } from '$lib/constants/navigation';
</script>

<ul class="overflow-x-auto">
	{#each communities as community (community.name)}
		<li class="inline-block mb-2 mr-2">
			<a href={community.to} class="btn btn-sm variant-ringed-surface font-logo py-3 md:btn-lg"
				>{community.name}</a
			>
		</li>
	{/each}
</ul>
