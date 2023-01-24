<script lang="ts">
	// import type { LayoutData } from './$types';

	import Header from './_Header/Header.svelte';
	import Footer from '$components/Footer/Footer.svelte';

	// export let data: LayoutData;
</script>

<Header />

<main class="px-[5vw] py-4 md:py-8">
	<slot />
</main>

<Footer />
