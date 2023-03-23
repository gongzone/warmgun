<script lang="ts">
	export const communities = [
		{
			name: 'Frontend',
			to: '/community/frontend'
		},
		{
			name: 'Backend',
			to: '/community/backend'
		},
		{
			name: 'Dev-Ops',
			to: '/community/dev-ops'
		},
		{
			name: 'Mobile',
			to: '/community/mobile'
		},
		{
			name: 'Game',
			to: '/community/game'
		},
		{
			name: 'Data Science',
			to: '/community/data-science'
		}
	];
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
