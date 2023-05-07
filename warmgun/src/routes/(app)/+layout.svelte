<script lang="ts">
	import AppHeader from '$components/Header/AppHeader/AppHeader.svelte';
</script>

<AppHeader />

<div class="px-[5vw]">
	<main class="w-full max-w-[1336px] mx-auto py-16 md:py-24">
		<slot />
	</main>
</div>
