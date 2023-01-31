<script lang="ts">
	import type { PageData } from './$types';

	import BlogHero from './_BlogHero/BlogHero.svelte';

	export let data: PageData;

	let blogUser = data.blogUser;
</script>
