<script lang="ts">
	import type { LayoutData } from './$types';

	import BlogHeader from '$components/Header/BlogHeader.svelte';
	import BlogHero from './blog-hero.svelte';

	export let data: LayoutData;
</script>

<BlogHeader blogUser={data.blogUser} />

<div class="px-[5vw] py-12">
	<BlogHero {data} />
</div>

<div class="px-[5vw] py-12">
	<slot />
</div>
