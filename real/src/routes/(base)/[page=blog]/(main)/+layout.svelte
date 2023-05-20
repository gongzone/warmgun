<script lang="ts">
	import type { PageData } from './$types';

	import BlogHero from '$lib/components/Hero/BlogHero/BlogHero.svelte';
	import BlogTab from '$lib/components/@ui/Tab/BlogTab.svelte';

	export let data: PageData;
</script>

<BlogHero blogUser={data.blogUser} />

<main class="container mt-16 space-y-12">
	<BlogTab />
	<slot />
</main>
