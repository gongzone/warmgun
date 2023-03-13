<script lang="ts">
	import { page } from '$app/stores';
	import { drawerStore } from '@skeletonlabs/skeleton';

	import { communities } from '$lib/constants/navigation';

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!bg-primary-active-token' : '';
</script>

<nav class="list-nav">
	<ul>
		{#each communities as community (community.name)}
			<li>
				<a
					href={community.to}
					class={classesActive(community.to)}
					on:click={() => drawerStore.close()}
				>
					<span class="flex-auto">{community.name}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
