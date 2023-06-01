<script lang="ts">
	import type { PageData } from './$types';

	import BlogHero from './_BlogHero/BlogHero.svelte';
	import BlogTab from './_BlogTab/BlogTab.svelte';

	export let data: PageData;
</script>

<BlogHero blogUser={data.blogUser} isOwner={data.isOwner} isFollowing={data.isFollowing} />

<main class="container mt-16 space-y-8">
	<BlogTab />
	<slot />
</main>
