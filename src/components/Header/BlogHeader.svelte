<script lang="ts">
	import type { BlogUser } from '$lib/types/blog-user';
	import { AppBar } from '@skeletonlabs/skeleton';

	export let blogUser: BlogUser;
</script>

<AppBar padding="px-[5vw] py-1">
	<svelte:fragment slot="lead">
		<a class="flex items-center" href="/">
			<h2 class="font-logo text-3xl md:text-4xl">DevWarriors</h2>
		</a>
	</svelte:fragment>

	<svelte:fragment slot="trail" />
</AppBar>
