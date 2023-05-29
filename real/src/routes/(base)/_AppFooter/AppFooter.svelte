<script lang="ts">
	import { siteConfig } from '$lib/configs/site';

	import FooterWords from './FooterWords/FooterWords.svelte';
	import FooterNav from './FooterNav/FooterNav.svelte';
</script>

<footer class="container mt-32 border-t border-t-surface-500 py-12">
	<div class="grid grid-cols-4 gap-2 sm:grid-cols-7 lg:grid-cols-8">
		<section class="col-span-3 hidden sm:block">
			<FooterWords />
		</section>

		<section class="col-span-2 space-y-4">
			<span class="text-lg font-bold">Site</span>
			<FooterNav items={siteConfig.mainNav} />
		</section>

		<section class="col-span-2 space-y-4">
			<span class="text-lg font-bold">Genre</span>
			<FooterNav items={siteConfig.genre} />
		</section>
	</div>

	<div class="py-12">
		<span class="font-thin">All rights reserved © GongZone {new Date().getFullYear()}</span>
	</div>
</footer>
