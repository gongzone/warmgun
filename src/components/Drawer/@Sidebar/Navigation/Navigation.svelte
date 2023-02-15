<script lang="ts">
	import NavHeader from './NavHeader/NavHeader.svelte';
	import NavDefaultLinks from './NavDefaultLinks/NavDefaultLinks.svelte';
	import NavCommunities from './NavCommunities/NavCommunities.svelte';
</script>

<NavHeader />

<div class="px-4 py-6">
	<NavDefaultLinks />
	<hr class="my-4" />
	<div class="text-surface-300 pl-4 text-sm font-bold mb-2">공동체</div>
	<NavCommunities />
</div>
