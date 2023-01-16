<script lang="ts">
	import type { LayoutData } from './$types';

	import BlogHeader from './blog-header.svelte';
	import BlogHero from './blog-hero.svelte';

	export let data: LayoutData;
</script>

<BlogHeader user={data.user} />

<div class="px-[5vw] py-12">
	<BlogHero {data} />
</div>

<div class="px-[5vw] py-12">
	<slot />
</div>
