<script lang="ts">
	import type { LayoutData } from './$types';
	import AppHeader from './_AppHeader/AppHeader.svelte';
	import AppFooter from './_AppFooter/AppFooter.svelte';

	export let data: LayoutData;
</script>

<!-- <AppHeader user={data.user} /> -->
<slot />
<AppFooter />
