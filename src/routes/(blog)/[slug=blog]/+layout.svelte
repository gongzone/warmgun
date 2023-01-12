<script lang="ts">
	import type { LayoutData } from './$types';

	import BlogHeader from './blog-header.svelte';
	import BlogHero from './blog-hero.svelte';

	export let data: LayoutData;
</script>

<BlogHeader />

<div class="px-[5vw] py-12">
	<BlogHero />
</div>

<div>
	<slot />
</div>
