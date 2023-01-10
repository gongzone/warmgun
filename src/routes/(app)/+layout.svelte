<script lang="ts">
	import type { LayoutData } from './$types';

	import Header from '$lib/components/header.svelte';

	export let data: LayoutData;
</script>

<Header user={data.user} />

<main class="px-[5vw] py-4 md:py-8"><slot /></main>

<div>Footer</div>
