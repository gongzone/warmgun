<script lang="ts">
	import BlogHero from '$components/Hero/BlogHero.svelte';
	import BlogTab from '$components/Tab/BlogTab.svelte';
</script>

<div class="md:max-w-[720px] mx-auto py-20">
	<BlogHero />

	<div class="px-[5vw] my-8 sm:my-12 md:px-0 lg:my-12">
		<BlogTab />
		<div class="py-6">
			<slot />
		</div>
	</div>
</div>
