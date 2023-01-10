<script lang="ts">
	import type { LayoutData } from './$types';

	import Header from '$components/header.svelte';

	// export let data: LayoutData;

	// $: user = data.user
</script>

<Header />

<main class="px-[5vw] py-4 md:py-8"><slot /></main>

<div>Footer</div>
