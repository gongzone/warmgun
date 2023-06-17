<script lang="ts">
	import type { LayoutData } from './$types';
	import BlogHeader from './_BlogHeader/BlogHeader.svelte';

	export let data: LayoutData;
</script>

<BlogHeader user={data.user} />

<slot />
