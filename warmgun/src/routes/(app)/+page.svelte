<script lang="ts">
	import Seo from '$components/Seo.svelte';
	import HomeHero from '$components/Hero/HomeHero/HomeHero.svelte';
</script>

<Seo title="Warmgun" description="개발 커뮤니티 & 블로그 서비스">
	<link rel="preload" as="image" href="/skeleton.jfif" />
</Seo>

<div>
	<section class="">
		<div class="section-container">
			<HomeHero />
		</div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-[5vw] py-16 md:py-24;
	}

	.hero-gradient {
		background-image: radial-gradient(
				at 0% 0%,
				rgba(var(--color-secondary-500) / 0.11) 0px,
				transparent 50%
			),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.11) 0px, transparent 50%);
	}
</style>
