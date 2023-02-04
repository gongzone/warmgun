<script lang="ts">
	import type { LayoutData } from './$types';

	import BlogHero from './_BlogHero/BlogHero.svelte';
	import BlogTab from './_BlogTab/BlogTab.svelte';

	export let data: LayoutData;
</script>

<div class="px-5 py-8 sm:px-16 sm:py-16 max-w-[720px] mx-auto">
	<BlogHero bloger={data.bloger} />
</div>

<div class="max-w-[878px] mx-auto sm:px-10">
	<BlogTab />
	<slot />
</div>

<div class="h-40" />
