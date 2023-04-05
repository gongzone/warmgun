<script lang="ts">
	import BlogerDisplay from '$components/Display/BlogerDisplay/BlogerDisplay.svelte';
	import BlogTab from '$components/Tab/BlogTab.svelte';
</script>

<div class="md:max-w-[720px] mx-auto px-[5vw] my-8 md:px-0 md:my-20">
	<BlogerDisplay />
	<hr class="!border-dashed !mt-8 md:!hidden" />

	<div class="my-8 sm:my-12 md:px-0 lg:my-12">
		<BlogTab />
		<div class="py-6">
			<slot />
		</div>
	</div>
</div>
