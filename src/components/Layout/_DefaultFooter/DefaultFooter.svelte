<script lang="ts">
	import { navs } from '$lib/configs/nav';
	import { genre } from '$lib/configs/genre';

	import FooterWords from './FooterWords/FooterWords.svelte';
	import FooterNav from './FooterNav/FooterNav.svelte';
</script>

<footer class="container mt-32 border-t border-t-surface-500 py-12">
	<div class="grid grid-cols-4 gap-2 sm:grid-cols-7 lg:grid-cols-8">
		<section class="col-span-3">
			<FooterWords description="개발 커뮤니티 & 블로그 서비스" />
		</section>
	</div>

	<div class="py-12">
		<span class="font-thin">All rights reserved © GongZone {new Date().getFullYear()}</span>
	</div>
</footer>
