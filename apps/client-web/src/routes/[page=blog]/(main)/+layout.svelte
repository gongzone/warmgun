<script lang="ts">
	import BlogHero from '$components/Hero/BlogHero.svelte';
	import BlogTab from '$components/Tab/BlogTab.svelte';
</script>

<div class="lg:max-w-[720px] mx-auto py-20">
	<BlogHero />

	<div class="px-4 sm:px-8 my-8 sm:my-12 md:px-24 lg:px-0 lg:my-12">
		<BlogTab />
		<slot />
	</div>
</div>
