<script lang="ts">
	import type { LayoutData } from './$types';

	import Header from './_Header/Header.svelte';

	export let data: LayoutData;

	let user = data.user;
</script>

<Header {user} />

<main class="px-[5vw] py-4 md:py-8">
	<slot />
</main>
