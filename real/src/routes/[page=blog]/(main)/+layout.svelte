<script lang="ts">
	import type { PageData } from './$types';

	import BlogHero from './_BlogHero/BlogHero.svelte';
	import BlogTab from './_BlogTab/BlogTab.svelte';

	export let data: PageData;
</script>

<div class="page-container space-y-14 !pt-12">
	<BlogHero blogUser={data.blogUser} isOwner={data.isOwner} isFollowing={data.isFollowing} />

	<main class="space-y-8">
		<BlogTab />
		<div class="min-h-[200px]">
			<slot />
		</div>
	</main>
</div>
