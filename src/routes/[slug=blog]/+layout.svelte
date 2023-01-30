<script lang="ts">
	import type { LayoutData } from './$types';

	import BlogHeader from './_BlogHeader/BlogHeader.svelte';

	export let data: LayoutData;

	let user = data.user;
</script>

<BlogHeader {user} />

<div class="py-16">
	<slot />
</div>
