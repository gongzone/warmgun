<script lang="ts">
	import type { LayoutData } from './$types';

	import BlogHero from './_BlogHero/BlogHero.svelte';
	import BlogTab from './_BlogTab/BlogTab.svelte';

	export let data: LayoutData;

	let blogUser = data.blogUser;
</script>

<div class="py-8 max-w-[600px] mx-auto sm:py-12 sm:mb-4">
	<BlogHero {blogUser} />
</div>

<div class="max-w-[720px] mx-auto">
	<div class="">
		<BlogTab />
	</div>
	<slot />
</div>

<div class="h-40" />
